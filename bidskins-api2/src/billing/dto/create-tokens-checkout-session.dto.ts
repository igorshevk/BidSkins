import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateTokensCheckoutSessionDto {
	@ApiProperty({ description: 'The package id.' })
	@IsString()
	readonly id: string
}
