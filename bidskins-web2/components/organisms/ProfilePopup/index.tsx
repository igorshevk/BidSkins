import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, Divider, Heading, Icon, Img, Link, P, TextInput } from '../../atoms'
import { AuctionWinningsRow, BalancePreview, MoneyStat, ProfileTableRow } from '../../molecules'

import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList as List } from 'react-window'

import {
	AuctionWinningsHeader,
	InfoWrapper,
	ModalWrapper,
	ProfileSideNav,
	ProfileTableHeader,
	ProfileTableValuesWrapper,
	ProfileWrapper,
	TradeInputButtonWrapper,
	TradeWrapper,
	UpdateUrlWrapper,
	UrlInstructionsWrapper,
	UserWrapper,
	ValueWrapper,
	Wrapper,
} from './styles'
import { useAuthContext } from '../../../context'
import { useGetUserAuctionsWon, useGetUserTransactions } from '../../../hooks'
import PurchaseItemPopup from '../PurchaseItemPopup'
import { Auction } from '../../../utils'

interface ProfilePopupProps {
	open: boolean
	setOpen: (boolean) => void
}

const ProfilePopup: FC<ProfilePopupProps> = ({ open, setOpen }) => {
	const { user } = useAuthContext()
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserTransactions()
	const { data: auctionsWon } = useGetUserAuctionsWon()

	const transactions = data?.pages.reduce((acc, cur) => [...acc, ...cur.data], []) || []

	const ref = useRef<HTMLElement>(null)
	const [mounted, setMounted] = useState(false)
	const [modalFocus, setModalFocus] = useState(false)

	const [page, setPage] = useState<'HOME' | 'WINNINGS'>('HOME')
	const [selectedAuctionItem, setSelectedAuctionItem] = useState<Auction>()
	const [purchaseItemPopupOpen, setPurchaseItemPopupOpen] = useState(false)

	useEffect(() => {
		ref.current = document.body
		setMounted(true)
	})

	useEffect(() => {
		if (open) {
			fetchNextPage()
		}
	}, [open])

	// If there are more items to be loaded then add an extra row to hold a loading indicator.
	const itemCount = hasNextPage ? transactions.length + 1 : transactions.length

	// Every row is loaded except for our loading indicator row
	const isItemLoaded = (index) => !hasNextPage || index < transactions.length

	const checkIfClickedOutside = () => {
		if (!modalFocus) {
			setOpen(false)
		}
	}

	return mounted && user
		? createPortal(
				<Wrapper onClick={checkIfClickedOutside} open={open}>
					<ModalWrapper
						onClick={(e) => e.stopPropagation()}
						onMouseLeave={() => setModalFocus(false)}
						onMouseEnter={() => setModalFocus(true)}
					>
						<ProfileWrapper>
							<div>
								<UserWrapper>
									<Img src={user.avatar} width={155} height={155} />
									<P
										fontSize={[26, 26, 26, 22]}
										color={'white'}
										fontWeight={700}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whitespace={'nowrap'}
										maxWidth={'100%'}
									>
										{user.username}
									</P>
									<BalancePreview tokens={0} />
								</UserWrapper>
								<ValueWrapper>
									<MoneyStat label={'Deposited'} value={21.37} />
									<Divider marginTop={17} marginRight={30} marginBottom={17} marginLeft={30} />
									<MoneyStat label={'Total Won'} value={47.1} />
									<Divider marginTop={17} marginRight={30} marginBottom={17} marginLeft={30} />
									<MoneyStat label={'Profit'} value={28.3} />
								</ValueWrapper>
								<TradeWrapper>
									<UpdateUrlWrapper>
										<div>
											<Heading.H2 fontSize={17} color={'white'}>
												Save your Trade Url
											</Heading.H2>
											<P fontSize={14} fontWeight={700} color={'gray-light'}>
												Please make sure the trade url is valid or we won’t be able to send
												you trade offers. Find your trade url&nbsp;
												<Link color={'blue-light'} fontSize={14} fontWeight={700}>
													here
												</Link>
											</P>
										</div>
										<TradeInputButtonWrapper>
											<TextInput
												placeholder={'Enter your trade url'}
												height={27}
												padding={'5px 10px'}
												fontWeight={700}
												backgroundColor={'gray-darker'}
												color={'white'}
											/>
											<Button
												backgroundColor={'primary'}
												fontWeight={700}
												height={27}
												padding={'5px 13px'}
											>
												Save
											</Button>
										</TradeInputButtonWrapper>
									</UpdateUrlWrapper>
									<UrlInstructionsWrapper>
										<P fontSize={14} fontWeight={700} color={'gray-light'}>
											By setting your trade url, you are agreeing to the&nbsp;
											<Link color={'blue-light'} fontSize={14} fontWeight={700}>
												Terms of Service
											</Link>
											&nbsp;and&nbsp;
											<Link color={'blue-light'} fontSize={14} fontWeight={700}>
												Privacy Policy
											</Link>
											&nbsp;of Bidskins.
										</P>
									</UrlInstructionsWrapper>
								</TradeWrapper>
							</div>
						</ProfileWrapper>
						<InfoWrapper>
							{page === 'HOME' && (
								<Fragment>
									<ProfileTableHeader>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Id
										</P>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Action
										</P>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Tokens
										</P>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Timestamp
										</P>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Status
										</P>
									</ProfileTableHeader>
									<ProfileTableValuesWrapper>
										<AutoSizer disableWidth>
											{({ height }) => (
												<InfiniteLoader
													itemCount={itemCount}
													isItemLoaded={isItemLoaded}
													// Only load 1 page (50 items) at a time.
													loadMoreItems={isFetchingNextPage ? () => null : fetchNextPage}
												>
													{({ onItemsRendered, ref }) => (
														<List
															height={height}
															itemCount={itemCount}
															onItemsRendered={onItemsRendered}
															ref={ref}
															itemSize={70}
															width={'100%'}
															itemData={{ isItemLoaded, transactions }}
														>
															{ProfileTableRow}
														</List>
													)}
												</InfiniteLoader>
											)}
										</AutoSizer>
									</ProfileTableValuesWrapper>
									<TradeWrapper>
										<UpdateUrlWrapper>
											<div>
												<Heading.H2 fontSize={17} color={'white'}>
													Save your Trade Url
												</Heading.H2>
												<P fontSize={14} fontWeight={700} color={'gray-light'}>
													Please make sure the trade url is valid or we won’t be able to
													send you trade offers. Find your trade url&nbsp;
													<Link color={'blue-light'} fontSize={14} fontWeight={700}>
														here
													</Link>
												</P>
											</div>
											<TradeInputButtonWrapper>
												<TextInput
													placeholder={'Enter your trade url'}
													height={27}
													padding={'5px 10px'}
													fontWeight={700}
													backgroundColor={'gray-darker'}
													color={'white'}
												/>
												<Button
													backgroundColor={'primary'}
													fontWeight={700}
													height={27}
													padding={'5px 13px'}
												>
													Save
												</Button>
											</TradeInputButtonWrapper>
										</UpdateUrlWrapper>
										<UrlInstructionsWrapper>
											<P fontSize={14} fontWeight={700} color={'gray-light'}>
												By setting your trade url, you are agreeing to the&nbsp;
												<Link color={'blue-light'} fontSize={14} fontWeight={700}>
													Terms of Service
												</Link>
												&nbsp;and&nbsp;
												<Link color={'blue-light'} fontSize={14} fontWeight={700}>
													Privacy Policy
												</Link>
												&nbsp;of Bidskins.
											</P>
										</UrlInstructionsWrapper>
									</TradeWrapper>
								</Fragment>
							)}
							{page === 'WINNINGS' && (
								<Fragment>
									<AuctionWinningsHeader>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Id
										</P>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Image
										</P>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Name
										</P>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Price
										</P>
										<P color={'white'} fontSize={19} fontWeight={700}>
											Payment Deadline
										</P>
									</AuctionWinningsHeader>
									{auctionsWon.map((auction) => (
										<AuctionWinningsRow
											key={auction.id}
											data={auction}
											onClick={
												auction.paidFor || new Date() > new Date(auction.paymentDeadline)
													? null
													: () => {
															setSelectedAuctionItem(auction)
															setPurchaseItemPopupOpen(true)
													  }
											}
										/>
									))}
								</Fragment>
							)}
						</InfoWrapper>
						<Button
							color={'gray-lighter'}
							fontSize={18}
							fontWeight={700}
							onClick={() => setOpen(false)}
						>
							X
						</Button>
						<ProfileSideNav>
							<Button onClick={() => setPage('HOME')}>
								<Icon
									className={'fas fa-home'}
									fontSize={'1.4rem'}
									color={page !== 'HOME' ? 'gray-lighter' : undefined}
								/>
							</Button>
							<Button onClick={() => setPage('WINNINGS')}>
								<Icon
									className={'fas fa-award'}
									fontSize={'1.4rem'}
									color={page !== 'WINNINGS' ? 'gray-lighter' : undefined}
								/>
							</Button>
							<Button>
								<Icon className={'fas fa-scroll'} fontSize={'1.4rem'} color={'gray-lighter'} />
							</Button>
						</ProfileSideNav>
					</ModalWrapper>
					<PurchaseItemPopup
						open={purchaseItemPopupOpen}
						setOpen={setPurchaseItemPopupOpen}
						item={selectedAuctionItem}
					/>
				</Wrapper>,
				ref.current
		  )
		: null
}

export default ProfilePopup
