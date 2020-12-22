import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import {
	Auction,
	DepositItem,
	DepositItemsResponse,
	InventoryResponse,
	StripeAuctionCheckoutData,
	StripeCheckoutSession,
	StripeTokensCheckoutData,
	TransactionResponse,
	UserProfile,
} from '../utils'
import { CookieService } from './'

class ApiService {
	private readonly BASE_URL: string = process.env.NEXT_PUBLIC_API_URL
	private readonly pub: AxiosInstance // Axios instance for public fetch
	private readonly auth: AxiosInstance

	constructor() {
		const config: AxiosRequestConfig = {
			baseURL: this.BASE_URL,
		}

		const interceptorResponseFn = (response: AxiosResponse): AxiosResponse => response.data

		const interceptorErrorFn = (error) => {
			return Promise.reject({
				status: error.response.status,
				statusText: error.response.data.message,
				message: error.response.statusText,
			})
		}

		this.pub = axios.create(config)
		this.pub.interceptors.response.use(interceptorResponseFn, interceptorErrorFn)

		this.auth = axios.create(config)
		this.auth.interceptors.request.use(
			(config) => {
				const token = CookieService.getAccessToken()

				if (token) {
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			},
			(err) => Promise.reject(err)
		)
		this.auth.interceptors.response.use(interceptorResponseFn, interceptorErrorFn)
	}

	async checkoutTokensStripe(data: StripeTokensCheckoutData): Promise<StripeCheckoutSession | null> {
		try {
			const stripeCheckoutSession: StripeCheckoutSession = await this.auth.post(
				'billing/tokens-stripe',
				data
			)
			return stripeCheckoutSession
		} catch (error) {
			return null
		}
	}

	async checkoutAuctionStripe(data: StripeAuctionCheckoutData): Promise<StripeCheckoutSession | null> {
		try {
			const stripeCheckoutSession: StripeCheckoutSession = await this.auth.post(
				'billing/auction-stripe',
				data
			)
			return stripeCheckoutSession
		} catch (error) {
			return null
		}
	}

	async getUserProfile(): Promise<UserProfile | null> {
		try {
			const user: UserProfile = await this.auth.get('users/me')
			return user
		} catch (error) {
			return null
		}
	}

	async getTransactions(page = 1): Promise<TransactionResponse | null> {
		try {
			const transactions: TransactionResponse = await this.auth.get('users/me/transactions', {
				params: { page: page },
			})
			return transactions
		} catch (error) {
			return null
		}
	}

	async getInventory(page = 1): Promise<InventoryResponse | null> {
		try {
			const inventory: InventoryResponse = await this.auth.get('users/me/inventory', {
				params: { page: page, limit: 25 },
			})
			return inventory
		} catch (error) {
			return null
		}
	}

	async depositItems(items: DepositItem[]): Promise<DepositItemsResponse | null> {
		try {
			const depositItemsResponse: DepositItemsResponse = await this.auth.post('billing/deposit-items', {
				items,
			})
			return depositItemsResponse
		} catch (error) {
			return null
		}
	}

	async getAuctionsWon(): Promise<Auction[]> {
		try {
			const depositItemsResponse: Auction[] = await this.auth.get('users/me/auctions-won')
			return depositItemsResponse
		} catch (error) {
			return []
		}
	}
}

export default new ApiService()
