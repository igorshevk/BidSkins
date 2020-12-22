import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AuctionEntity } from '../../auctions/entities/auction.entity'
import { UserEntity } from './user.entity'

export enum TransactionType {
	BID = 'bid',
	DEPOSIT = 'deposit',
	WITHDRAW = 'withdraw',
}

@Entity('transaction')
export class TransactionEntity {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne((type) => UserEntity, (type) => type.id)
	user: UserEntity

	// TODO: Insert Auction Here
	@ManyToOne((type) => AuctionEntity, (type) => type.id)
	auction: AuctionEntity

	@Column({ type: 'enum', enum: TransactionType })
	type: string

	@Column({ unique: true, nullable: true })
	orderId: string

	@Column()
	tokens: number

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date
}
