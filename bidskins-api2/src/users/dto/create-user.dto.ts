import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({ description: 'The new username.' })
	@IsString()
	readonly id: string

	@ApiProperty({ description: 'The new username.' })
	@IsString()
	readonly username: string

	@ApiProperty({ description: 'The new avatar.' })
	@IsString()
	readonly avatar: string

	@ApiProperty({ description: 'The tradelink' })
	@IsString()
	readonly tradeLink?: string
}
