import { useQuery, useMutation, useInfiniteQuery } from 'react-query'

import { ApiService } from '../services'
import { DepositItem } from '../utils'

export function useGetUserProfile() {
	return useQuery('users/me', async () => await ApiService.getUserProfile())
}

export function useGetUserAuctionsWon() {
	return useQuery('users/me/auctions-won', async () => await ApiService.getAuctionsWon())
}

export function useGetUserTransactions() {
	return useInfiniteQuery(
		'users/me/transactions',
		async ({ pageParam = 1 }) => {
			const transactions = await ApiService.getTransactions(pageParam)
			return {
				data: transactions.items,
				nextPage: transactions.meta.currentPage + 1,
				totalPages: transactions.meta.totalPages,
			}
		},
		{ getNextPageParam: ({ nextPage, totalPages }) => (nextPage <= totalPages ? nextPage ?? 0 : undefined) }
	)
}

export function useGetUserInventory(page = 1) {
	return useQuery(['users/me/inventory', page], async () => await ApiService.getInventory(page), {
		keepPreviousData: true,
	})
}

export function useDepositItems() {
	return useMutation(
		'billing/deposit-items',
		async (items: DepositItem[]) => await ApiService.depositItems(items)
	)
}
