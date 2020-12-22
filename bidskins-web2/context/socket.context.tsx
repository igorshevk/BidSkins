import React, { FC, createContext, useContext, useEffect, useState } from 'react'
import { ApiService, SocketApiService } from '../services'
import { Auction } from '../utils'
import { useAuthContext } from './auth.context'
import { useToasts } from 'react-toast-notifications'

interface Context {
	auctions: Auction[]
	bidOnAuction: (id: number) => void
	auctionsBiddingOn: number[]
	tokens: number
}

const SocketContext = createContext<Context | undefined>(undefined)

export const SocketContextProvider: FC = ({ children }) => {
	const { addToast } = useToasts()
	const [auctions, setAuctions] = useState<Auction[]>([])
	const [tokens, setTokens] = useState(0)

	// The auctions they pressed bid on so they can't press it twice
	const [auctionsBiddingOn, setAuctionsBiddingOn] = useState([])

	const { isAuthenticated } = useAuthContext()

	// We have to recreate SocketApiService when the user logs in and load defaults
	useEffect(() => {
		SocketApiService.reloadSocket()

		const loadDefaults = async () => {
			const profile = await ApiService.getUserProfile()
			if (!profile) {
				return
			}

			setTokens(profile.tokens)
		}

		loadDefaults()
	}, [isAuthenticated()])

	// setup all the events
	useEffect(() => {
		SocketApiService.loadAuctionsEvent((auctions) => setAuctions(auctions))

		SocketApiService.updateAuctionEvent((updatedAuction) => {
			setAuctions((auctions) =>
				auctions.map((auction) => (auction.id === updatedAuction.id ? updatedAuction : auction))
			)
		})

		SocketApiService.updateTokensEvent((tokens) => {
			setTokens(tokens)
		})

		SocketApiService.completeAuctionsEvent((auctionsToRemoveById) => {
			// Remove auctions that are in the auction ids to remove
			setAuctions((auctions) =>
				auctions.filter((auction) => !auctionsToRemoveById.find((id) => id === auction.id))
			)
		})
	}, [])

	const bidOnAuction = (id: number) => {
		setAuctionsBiddingOn((auctionsBiddingOn) => auctionsBiddingOn.concat(id))
		SocketApiService.bidOnAuction(id, (status) => {
			if (status === 'FAILURE') {
				addToast(`Failed to place bid on auction #${id}`, { appearance: 'error' })
			}
			setAuctionsBiddingOn((auctionsBiddingOn) => auctionsBiddingOn.filter((auctionId) => auctionId !== id))
		})
	}

	const { Provider } = SocketContext

	return (
		<Provider
			value={{
				auctions,
				bidOnAuction,
				auctionsBiddingOn,
				tokens,
			}}
		>
			{children}
		</Provider>
	)
}

export function useSocketContext() {
	return useContext(SocketContext)
}
