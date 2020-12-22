import { HttpService, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { TransactionEntity, TransactionType } from './entities/transaction.entity'
import { DepositTokensDto } from './dto/deposit-tokens.dto'
import { paginateArray } from '../common/utils/pagination'
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'

@Injectable()
export class UsersService {
	constructor(
		private httpService: HttpService,
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>,
		private connection: Connection
	) {}

	async findOne(id: string) {
		return this.userRepository.findOne(id)
	}

	async findAuctionsWon(id: string) {
		const { auctionsWon } = await this.userRepository.findOne(id, { relations: ['auctionsWon'] })
		return auctionsWon
	}

	async findTransactions(userId: string, options: IPaginationOptions): Promise<Pagination<TransactionEntity>> {
		const user = await this.findOne(userId)
		return paginate<TransactionEntity>(this.transactionRepository, options, {
			where: { user },
			order: { createdAt: 'DESC' },
			relations: ['auction'],
		})
	}

	async fetchInventory(id: string, paginationQueryDto: PaginationQueryDto) {
		const { data } = await this.httpService.get(`http://localhost:6000/inventory/${id}`).toPromise()

		// Items with pagination
		const items = paginateArray(data, paginationQueryDto.limit, paginationQueryDto.page)

		return {
			items: items,
			meta: {
				totalItems: data.length,
				itemCount: items.length,
				itemsPerPage: paginationQueryDto.limit,
				totalPages: Math.ceil(data.length / paginationQueryDto.limit),
				currentPage: paginationQueryDto.page,
			},
		}
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.userRepository.preload({
			id,
			...updateUserDto,
		})

		return this.userRepository.save(user)
	}

	async upsert(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.userRepository.preload({
			id,
			...updateUserDto,
		})

		if (!user) {
			const newUser = this.userRepository.create({
				id: id,
				username: updateUserDto.username,
				avatar: updateUserDto.avatar,
			})
			return this.userRepository.save(newUser)
		}

		return this.userRepository.save(user)
	}

	async depositTokens(id: string, depositTokensDto: DepositTokensDto) {
		const queryRunner = this.connection.createQueryRunner()

		await queryRunner.connect()
		await queryRunner.startTransaction()
		try {
			// add tokens to the user
			await queryRunner.manager.increment(UserEntity, { id }, 'tokens', depositTokensDto.tokens)

			const user = await queryRunner.manager.preload(UserEntity, { id })

			// create the transaction in the database
			const transaction = await queryRunner.manager.create(TransactionEntity, {
				user: user,
				type: TransactionType.DEPOSIT,
				...depositTokensDto,
			})

			await queryRunner.manager.save(transaction)

			await queryRunner.commitTransaction()
		} catch (err) {
			// since we have errors lets rollback the changes we made
			await queryRunner.rollbackTransaction()
		} finally {
			// you need to release a queryRunner which was manually instantiated
			await queryRunner.release()
		}
	}
}
