export interface User {
	id: string
	username: string
	avatar: string
}

export interface UserProfile {
	id: string
	username: string
	avatar: string
	tokens: number
}

export interface Auction {
	id: number
	itemId: number
	name: string
	type: string
	image: string
	worth: number
	bidCost: number
	currentPrice: number
	highestBidder: {
		id: string
		username: string
		avatar: string
	}
	timeStart: string
	timeEnd: string
	paidFor: boolean
	paymentDeadline: string
}

export interface Transaction {
	id: number
	type: string
	orderId: string
	tokens: number
	createdAt: string
	auction?: Auction
}

export interface TransactionResponse {
	items: Transaction[]
	meta: {
		totalItems: number
		itemCount: number
		itemsPerPage: number
		totalPages: number
		currentPage: number
	}
}

export interface InventoryItem {
	assetid: string
	name: string
	image: string
	price: number
}

export interface InventoryResponse {
	items: InventoryItem[]
	meta: {
		totalItems: number
		itemCount: number
		itemsPerPage: number
		totalPages: number
		currentPage: number
	}
}

export interface DepositItem {
	assetid: string
}

export interface DepositItemsResponse {
	message: string
}

export interface StripeTokensCheckoutData {
	id: string
}

export interface StripeAuctionCheckoutData {
	id: number
}

export interface StripeCheckoutSession {
	id: string
}
