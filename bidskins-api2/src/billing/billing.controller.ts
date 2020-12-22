import { Body, Controller, Get, Headers, Post, UseGuards, Request, UnauthorizedException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { BillingService } from './billing.service'
import { CreateAuctionCheckoutSessionDto } from './dto/create-auction-checkout-session.dto'
import { CreateTokensCheckoutSessionDto } from './dto/create-tokens-checkout-session.dto'
import { FulfillDepositItemsDto } from './dto/fulfill-deposit-items.dto'

@ApiTags('billing')
@Controller('billing')
export class BillingController {
	constructor(private readonly billingService: BillingService) {}

	@UseGuards(JwtAuthGuard)
	@Post('/tokens-stripe')
	createTokensCheckoutSession(
		@Request() req,
		@Body() createTokensCheckoutSessionDto: CreateTokensCheckoutSessionDto
	) {
		return this.billingService.createTokensCheckoutSession(req.user.id, createTokensCheckoutSessionDto)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/auction-stripe')
	createAuctionCheckoutSession(
		@Request() req,
		@Body() createAuctionCheckoutSessionDto: CreateAuctionCheckoutSessionDto
	) {
		return this.billingService.createAuctionCheckoutSession(req.user.id, createAuctionCheckoutSessionDto)
	}

	@Post('/checkout-webhook')
	async fulfillCheckoutSession(@Request() req, @Headers('stripe-signature') signature, @Body() body) {
		const payload = req.body
		return this.billingService.fulfillCheckoutSession(payload, signature)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/deposit-items')
	async depositItems(@Request() req, @Body('items') items: { assetid: string }[]) {
		return this.billingService.depositItems(req.user.id, items)
	}

	@Post('/deposit-items-webhook')
	async fulfillDepositItems(
		@Headers('Authorization') authorization: string,
		@Body() fulfillDepositItemsDto: FulfillDepositItemsDto
	) {
		// TODO: Later add custom authorization
		if (authorization === 'BIDSKINS-TEST') {
			return this.billingService.fulfillDepositItems(fulfillDepositItemsDto)
		} else {
			return new UnauthorizedException()
		}
	}
}
