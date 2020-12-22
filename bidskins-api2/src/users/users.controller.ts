import {
	Controller,
	Request,
	UseGuards,
	Patch,
	Body,
	UseInterceptors,
	ClassSerializerInterceptor,
	Get,
	Query,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { Pagination } from 'nestjs-typeorm-paginate'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { TransactionEntity } from './entities/transaction.entity'

@ApiTags('users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	getProfile(@Request() req) {
		return this.usersService.findOne(req.user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/auctions-won')
	getAuctionsWon(@Request() req) {
		return this.usersService.findAuctionsWon(req.user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/transactions')
	getTransactions(
		@Request() req,
		@Query() paginationQuery: PaginationQueryDto
	): Promise<Pagination<TransactionEntity>> {
		return this.usersService.findTransactions(req.user.id, paginationQuery)
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/inventory')
	getInventory(@Request() req, @Query() paginationQuery: PaginationQueryDto) {
		return this.usersService.fetchInventory(req.user.id, paginationQuery)
	}

	@UseGuards(JwtAuthGuard)
	@Patch('me')
	updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
		// TODO: In the future make sure UpdateUserDto doesn't allow users to change anything other than tradelink
		return this.usersService.update(req.user.id, updateUserDto)
	}
}
