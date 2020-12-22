import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDepositItems, useGetUserInventory } from '../../../hooks'
import { InventoryItem } from '../../../utils'
import { Button, Heading, P } from '../../atoms'
import { DepositItem, Pagination } from '../../molecules'
import {
	DepositHeading,
	DepositWrapper,
	InfoWrapper,
	ItemsWrapper,
	ModalWrapper,
	OptionsWrapper,
	PaymentWrapper,
	Wrapper,
} from './styles'

interface SelectedItem extends InventoryItem {
	selected: boolean
}

interface SelectedItemObject {
	[key: string]: SelectedItem
}

interface DepositItemsPopupProps {
	open: boolean
	setOpen: (boolean) => void
}

const DepositItemsPopup: FC<DepositItemsPopupProps> = ({ open, setOpen }) => {
	const ref = useRef<HTMLElement>(null)
	const [mounted, setMounted] = useState(false)
	const [modalFocus, setModalFocus] = useState(false)
	const [selectedItems, setSelectedItems] = useState<SelectedItemObject>({})
	const [tokenValue, setTokenValue] = useState(0)

	const [page, setPage] = useState(1)
	const { data, refetch } = useGetUserInventory(page)
	const { mutate, isLoading, data: depositItemsData } = useDepositItems()

	useEffect(() => {
		ref.current = document.body
		setMounted(true)
	})

	const checkIfClickedOutside = () => {
		if (!modalFocus) {
			setOpen(false)
		}
	}

	const toggleSelectedItem = (key, price) => {
		setSelectedItems((selectedItems) => {
			const selected = selectedItems[key] && selectedItems[key].selected === true ? false : true
			return { ...selectedItems, [key]: { selected, price } }
		})
	}

	const areAllItemsOnPageSelected = () => {
		if (!data) {
			return false
		}

		return data.items.reduce((acc, cur) => {
			// check if false, if at least one is false, all of them are not selected
			// if item doesn't exist or it isn't marked selected, we return false
			if (!selectedItems[cur.assetid] || selectedItems[cur.assetid].selected !== true) {
				return false
			}

			return acc
		}, true)
	}

	const toggleAllItemsOnPage = (deselect = false) => {
		setSelectedItems((selectedItems) => {
			return data.items.reduce((acc, cur) => {
				return Object.assign({}, acc, { [cur.assetid]: { selected: !deselect, price: cur.price } })
			}, selectedItems)
		})
	}

	useEffect(() => {
		const value = Object.values(selectedItems)
			.filter((item) => item.selected)
			.reduce((acc, cur) => Math.round(acc + cur.price * 100), 0)
		setTokenValue(value)
	}, [selectedItems])

	const checkout = () => {
		const depositItems = Object.entries(selectedItems).reduce(
			(acc, [id, info]) => (info.selected ? [...acc, { assetid: id }] : acc),
			[]
		)
		mutate(depositItems)
	}

	return mounted
		? createPortal(
				<Wrapper onClick={checkIfClickedOutside} open={open}>
					<ModalWrapper
						onClick={(e) => e.stopPropagation()}
						onMouseLeave={() => setModalFocus(false)}
						onMouseEnter={() => setModalFocus(true)}
					>
						<InfoWrapper>
							<Heading.H3
								fontSize={[26, 28]}
								fontFamily={'heading'}
								color={'primary'}
								fontWeight={400}
							>
								BIDSKINS
							</Heading.H3>
							<DepositWrapper>
								<DepositHeading>
									<P fontWeight={700} color={'white'} fontSize={'1.1rem'}>
										Build your&nbsp;
										<span>
											<P
												fontWeight={700}
												fontSize={'1.1rem'}
												color={'primary'}
												display={'inline'}
											>
												Package
											</P>
										</span>
									</P>
								</DepositHeading>
								<ItemsWrapper>
									{data &&
										data.items.map((item) => (
											<DepositItem
												key={item.assetid}
												image={item.image}
												price={item.price || 10}
												selected={
													selectedItems[item.assetid] &&
													selectedItems[item.assetid].selected
												}
												onClick={() => toggleSelectedItem(item.assetid, item.price)}
											/>
										))}
								</ItemsWrapper>
								<OptionsWrapper>
									<Pagination
										currentPage={page}
										setPage={setPage}
										totalPages={data ? data.meta.totalPages : 1}
									/>
									<Button
										backgroundColor={'blue-dark'}
										width={['100%', 'calc(50% - 10px)', 'calc(33% - 20px)']}
										height={45}
										marginLeft={[0, 0, 20]}
										borderBottomWidth={5}
										borderBottomStyle={'solid'}
										borderBottomColor={'blue-darker'}
										fontWeight={700}
										onClick={() => refetch()}
									>
										Refresh
									</Button>
									<Button
										backgroundColor={'blue-dark'}
										width={['100%', 'calc(50% - 10px)', 'calc(33% - 20px)']}
										height={45}
										marginLeft={[0, 0, 20]}
										borderBottomWidth={5}
										borderBottomStyle={'solid'}
										borderBottomColor={'blue-darker'}
										fontWeight={700}
										onClick={() => toggleAllItemsOnPage(areAllItemsOnPageSelected())}
									>
										{areAllItemsOnPageSelected() ? 'Deselect' : 'Select'} All
									</Button>
								</OptionsWrapper>
							</DepositWrapper>
						</InfoWrapper>
						<PaymentWrapper>
							<Heading.H2 color={'white'} fontSize={[24, 24, 30, 35]}>
								Payment Details{depositItemsData ? `: ${depositItemsData.message}` : ''}
							</Heading.H2>
							<Button
								backgroundColor={'blue-dark'}
								width={'100%'}
								maxWidth={300}
								height={45}
								borderBottomWidth={5}
								borderBottomStyle={'solid'}
								borderBottomColor={'blue-darker'}
								fontWeight={700}
								onClick={checkout}
								disabled={tokenValue === 0 || isLoading || depositItemsData !== undefined}
							>
								{depositItemsData && depositItemsData.message
									? 'CHECK YOUR TRADE OFFERS'
									: tokenValue
									? `GET ${tokenValue} TOKENS NOW`
									: `GET TOKENS NOW`}
							</Button>
						</PaymentWrapper>
						<Button color={'gray-lighter'} fontSize={18} fontWeight={700}>
							X
						</Button>
					</ModalWrapper>
				</Wrapper>,
				ref.current
		  )
		: null
}

export default DepositItemsPopup
