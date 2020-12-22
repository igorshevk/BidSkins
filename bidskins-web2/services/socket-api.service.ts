import io from 'socket.io-client'
import { Auction } from '../utils'

import { CookieService } from './'

class SocketApiService {
	private readonly BASE_URL: string = process.env.NEXT_PUBLIC_API_URL
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private socket: any

	constructor() {
		const token = CookieService.getAccessToken()

		const config = token ? { query: `authorization=Bearer ${CookieService.getAccessToken()}` } : {}

		this.socket = io(this.BASE_URL, config)
	}

	async reloadSocket() {
		const token = CookieService.getAccessToken()

		const config = token ? { query: `authorization=Bearer ${CookieService.getAccessToken()}` } : {}

		this.socket = io(this.BASE_URL, config)
	}

	async loadAuctionsEvent(callback: (auctions: Auction[]) => void) {
		return this.socket.on('load-auctions', (auctions: Auction[]) => callback(auctions))
	}

	async updateAuctionEvent(callback: (auction: Auction) => void) {
		return this.socket.on('update-auction', (auction: Auction) => callback(auction))
	}

	async updateTokensEvent(callback: (tokens: number) => void) {
		return this.socket.on('tokens', ({ tokens }: { tokens: number }) => callback(tokens))
	}

	async completeAuctionsEvent(callback: (auctionIds: number[]) => void) {
		return this.socket.on('complete-auctions', (auctionIds: number[]) => callback(auctionIds))
	}

	async bidOnAuction(id: number, callback) {
		try {
			return this.socket.emit('bid', { id }, (status: 'SUCCESS' | 'FAILURE') => callback(status))
		} catch (e) {
			console.log(e)
		}
	}
}

export default new SocketApiService()
