import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

// TODO: Make this have more fields
export class CreateAuctionDto {
	@ApiProperty({ description: 'The new username.' })
	@IsString()
	readonly id: number

	@ApiProperty({ description: 'Whether this auction is paid for or not.' })
	@IsBoolean()
	readonly paidFor: boolean
}
