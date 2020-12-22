import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('package')
export class PackageEntity {
	@PrimaryColumn('varchar', { length: 10 })
	id: string

	@Column('varchar', { length: 32 })
	name: string

	@Column()
	tokens: number

	@Column({ type: 'decimal', precision: 6, scale: 2 })
	price: number
}
