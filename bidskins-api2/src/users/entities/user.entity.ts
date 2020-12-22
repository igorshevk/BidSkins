import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Check, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { AuctionEntity } from '../../auctions/entities/auction.entity'
import { TransactionEntity } from './transaction.entity'

@Entity('user')
export class UserEntity {
	@PrimaryColumn('varchar', { length: 17 })
	id: string

	@Column('varchar', { length: 32 })
	username: string

	@Column('varchar', { length: 121 })
	avatar: string

	@OneToMany((type) => TransactionEntity, (type) => type.user)
	transactions: TransactionEntity[]

	@OneToMany((type) => AuctionEntity, (type) => type.highestBidder)
	auctionsWon: AuctionEntity[]

	@Column({ default: 0 })
	@Check('tokens >= 0')
	tokens: number

	@Column({ nullable: true })
	tradeLink: string
}
