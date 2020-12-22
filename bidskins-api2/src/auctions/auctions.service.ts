import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, IsNull, LessThan, MoreThan, Repository } from 'typeorm'
import { getNextDay } from '../common/utils/date'
import { TransactionEntity, TransactionType } from '../users/entities/transaction.entity'
import { UserEntity } from '../users/entities/user.entity'
import { UpdateAuctionDto } from './dto/update-auction.dto'
import { AuctionEntity } from './entities/auction.entity'

@Injectable()
export class AuctionsService {
	constructor(
		@InjectRepository(AuctionEntity) private readonly auctionRepository: Repository<AuctionEntity>,
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>,
		private connection: Connection
	) {}

	async findOne(id: string) {
		return this.auctionRepository.findOne(id, { relations: ['highestBidder'] })
	}

	async findAll() {
		return this.auctionRepository.find({
			where: [
				{
					timeEnd: MoreThan(new Date()),
				},
				{
					timeEnd: IsNull(),
				},
			],
			relations: ['highestBidder'],
		})
	}

	async updateAuction(id: number, updateAuctionDto: UpdateAuctionDto) {
		const auction = await this.auctionRepository.preload({
			id,
			...updateAuctionDto,
		})

		return this.auctionRepository.save(auction)
	}

	async bidOnAuction(id: number, userId: string): Promise<[AuctionEntity, UserEntity] | undefined> {
		let result

		const queryRunner = this.connection.createQueryRunner()

		await queryRunner.connect()
		await queryRunner.startTransaction()
		try {
			// fetch the auction
			const auction = await queryRunner.manager.findOne(AuctionEntity, id, {
				where: [
					{
						timeStart: LessThan(new Date()),
						timeEnd: MoreThan(new Date()),
					},
					{
						timeStart: LessThan(new Date()),
						timeEnd: IsNull(),
					},
				],
			})

			if (!auction) {
				throw new NotFoundException('Auction not found')
			}

			// deduct user tokens
			await queryRunner.manager.decrement(UserEntity, { id: userId }, 'tokens', auction.bidCost)

			// add transaction to the user
			const transaction = await queryRunner.manager.create(TransactionEntity, {
				user: {
					id: userId,
				},
				type: TransactionType.BID,
				tokens: auction.bidCost,
				auction: {
					id: id,
				},
			})

			await queryRunner.manager.save(transaction)

			// add bid to the auction
			await queryRunner.manager.query(
				`
                UPDATE auction 
					SET "currentPrice" = "currentPrice" + 0.01,
						"highestBidderId" = $1,
                        "timeEnd" = current_timestamp + INTERVAL '10' SECOND 
                WHERE id = $2
            `,
				[userId, id]
			)

			// return the new auction and user
			const [newAuction, newUser] = await Promise.all([
				queryRunner.manager.findOne(AuctionEntity, id, { relations: ['highestBidder'] }),
				queryRunner.manager.findOne(UserEntity, userId),
			])

			result = [newAuction, newUser]

			await queryRunner.commitTransaction()
		} catch (err) {
			console.log(err)
			// since we have errors lets rollback the changes we made
			await queryRunner.rollbackTransaction()
		} finally {
			// you need to release a queryRunner which was manually instantiated
			await queryRunner.release()
		}

		return result
	}

	// returns the ids of the auctions that were completed
	async fulfillUncompletedAuctions(): Promise<number[]> {
		// find auctions that still need to be processed (if time is over and no payment deadline)
		const auctionsToProcess = await this.auctionRepository.find({
			where: {
				timeEnd: LessThan(new Date()),
				paymentDeadline: IsNull(),
			},
		})

		// processes all auctions and returns id
		const processedAuctions = await Promise.all(
			auctionsToProcess.map(async (auction) => {
				const newAuction = await this.auctionRepository.preload({
					id: auction.id,
					paymentDeadline: getNextDay(),
				})
				const { id } = await this.auctionRepository.save(newAuction)

				return id
			})
		)

		return processedAuctions
	}
}
