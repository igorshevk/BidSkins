import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ColumnNumericTransformer } from '../../common/utils/transformers'
import { TransactionEntity } from '../../users/entities/transaction.entity'
import { UserEntity } from '../../users/entities/user.entity'

@Entity('auction')
export class AuctionEntity {
	@PrimaryGeneratedColumn()
	id: number

	/* Item */
	@Column({ type: 'varchar', length: 64 })
	itemId: string

	@Column({ type: 'varchar', length: 64 })
	name: string

	@Column({ type: 'varchar', length: 32 })
	type: string

	@Column({ type: 'varchar', length: 256 })
	image: string

	@Column({ type: 'decimal', precision: 7, scale: 2, transformer: new ColumnNumericTransformer() })
	worth: number
	/* Item End */

	@Column({ type: 'smallint' })
	bidCost: number

	@Column({ type: 'decimal', precision: 7, scale: 2, transformer: new ColumnNumericTransformer() })
	currentPrice: number

	// highest bidder, also the winner if auction ended
	@ManyToOne((type) => UserEntity, (type) => type.id, { nullable: true })
	highestBidder: UserEntity

	@Column({ type: 'timestamp with time zone', nullable: true })
	timeStart: Date

	@Column({ type: 'timestamp with time zone', nullable: true })
	timeEnd: Date

	@Column({ default: false })
	paidFor: boolean

	@Column({ type: 'timestamp with time zone', nullable: true })
	paymentDeadline: Date

	@Column({ type: 'varchar', length: 64 })
	botId: string

	@OneToMany((type) => TransactionEntity, (type) => type.id)
	transactions: TransactionEntity
}
