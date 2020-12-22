import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuctionsService } from './auctions.service'

@ApiTags('auctions')
@Controller('auctions')
export class AuctionsController {
	constructor(private readonly auctionsService: AuctionsService) {}

	@Get(':id')
	getAuction(@Param('id') id: string) {
		return this.auctionsService.findOne(id)
	}

	@Get('/')
	getAuctions(@Param('id') id: string) {
		return this.auctionsService.findAll()
	}
}
