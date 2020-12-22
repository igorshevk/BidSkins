import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateAuctionCheckoutSessionDto {
	@ApiProperty({ description: 'The auction id.' })
	@IsString()
	readonly id: string
}
