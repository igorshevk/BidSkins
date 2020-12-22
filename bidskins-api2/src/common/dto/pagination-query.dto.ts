import { Type } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'

export class PaginationQueryDto {
	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	page = 1

	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	limit = 50
}
