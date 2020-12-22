import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class FulfillDepositItemsDto {
	@ApiProperty({ description: 'The user id.' })
	@IsString()
	readonly userId: string

	@ApiProperty({ description: 'The tokens to add.' })
	@IsNumber()
	readonly tokens: number

	@ApiProperty({ description: 'The user id.' })
	@IsString()
	readonly orderId: string
}
