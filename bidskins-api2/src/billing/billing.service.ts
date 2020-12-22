import { BadRequestException, HttpService, Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { Repository } from 'typeorm'
import { AuctionsService } from '../auctions/auctions.service'
import { UsersService } from '../users/users.service'
import { CreateAuctionCheckoutSessionDto } from './dto/create-auction-checkout-session.dto'
import { CreateTokensCheckoutSessionDto } from './dto/create-tokens-checkout-session.dto'
import { FulfillDepositItemsDto } from './dto/fulfill-deposit-items.dto'
import { PackageEntity } from './entities/package.entity'

@Injectable()
export class BillingService {
	public constructor(
		private httpService: HttpService,
		@InjectStripe() private readonly stripeClient: Stripe,
		@InjectRepository(PackageEntity) private readonly packageRepository: Repository<PackageEntity>,
		private readonly auctionsService: AuctionsService,
		private readonly usersService: UsersService
	) {}

	async createTokensCheckoutSession(
		userId: string,
		createTokensCheckoutSessionDto: CreateTokensCheckoutSessionDto
	) {
		const packageItem = await this.packageRepository.findOne(createTokensCheckoutSessionDto.id)

		const session = await this.stripeClient.checkout.sessions.create({
			client_reference_id: userId,
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: packageItem.name,
							metadata: {},
						},
						unit_amount: packageItem.price * 100,
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: process.env.WEBSITE_URL,
			cancel_url: process.env.WEBSITE_URL,
		})

		return { id: session.id }
	}

	async createAuctionCheckoutSession(
		userId: string,
		createAuctionCheckoutSessionDto: CreateAuctionCheckoutSessionDto
	) {
		const {
			id,
			name,
			image,
			currentPrice,
			highestBidder,
			paymentDeadline,
			paidFor,
		} = await this.auctionsService.findOne(createAuctionCheckoutSessionDto.id)

		if (paidFor || new Date() > new Date(paymentDeadline) || highestBidder.id !== userId) {
			throw new UnprocessableEntityException('This item is not open for purchase.')
		}

		const session = await this.stripeClient.checkout.sessions.create({
			client_reference_id: userId,
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: name,
							images: [image],
							metadata: {
								id,
								type: 'AUCTION',
							},
						},
						unit_amount: currentPrice * 100,
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: process.env.WEBSITE_URL,
			cancel_url: process.env.WEBSITE_URL,
		})

		return { id: session.id }
	}

	async fulfillCheckoutSession(payload: Buffer, signature: string) {
		const event = this.stripeClient.webhooks.constructEvent(
			payload,
			signature,
			process.env.STRIPE_SIGNING_SECRET
		)

		// Handle the checkout.session.completed event
		if (event.type === 'checkout.session.completed') {
			const { id: orderId, client_reference_id: userId, amount_total: total } = event.data
				.object as Stripe.Checkout.Session

			const items = await this.stripeClient.checkout.sessions.listLineItems(orderId, { limit: 1 })

			const {
				data: [item],
			} = items

			const product = await this.stripeClient.products.retrieve(item.price.product.toString())

			// if auction, then do auction methods, otherwise give tokens
			if (product.metadata.type === 'AUCTION') {
				const user = await this.usersService.findOne(userId)
				const auction = await this.auctionsService.findOne(product.metadata.id)

				// Set paid for to true
				await this.auctionsService.updateAuction(auction.id, { paidFor: true })

				// send item to user
				await this.httpService
					.post(`http://localhost:6000/send-trade-offer/${auction.botId}`, {
						tradeLink: user.tradeLink,
						items: [{ assetid: auction.itemId }],
					})
					.toPromise()
			} else {
				const price = total / 100
				const { tokens } = await this.packageRepository.findOne({ price })
				await this.usersService.depositTokens(userId, { tokens, orderId })
			}
		}
	}

	async depositItems(userId: string, items: { assetid: string }[]) {
		const { tradeLink } = await this.usersService.findOne(userId)

		if (!tradeLink) {
			throw new BadRequestException('Trade Link not found on user')
		}

		const { data } = await this.httpService
			.post(`http://localhost:6000/send-trade-offer`, { tradeLink, theirItems: items })
			.toPromise()
		const { message } = data

		return { message }
	}

	async fulfillDepositItems(fulfillDepositItemsDto: FulfillDepositItemsDto) {
		this.usersService.depositTokens(fulfillDepositItemsDto.userId, fulfillDepositItemsDto)
	}
}
