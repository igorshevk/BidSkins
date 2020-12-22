import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class DepositTokensDto {
	@ApiProperty({ description: 'The tokens to add.' })
	@IsNumber()
	readonly tokens: number

	@ApiProperty({ description: 'The order id associated with the deposit.' })
	@IsString()
	readonly orderId: string
}
