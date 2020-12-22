import { FC, Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Auction, splitStringInHalf } from '../../../utils'
import { Button, Heading, Img, P } from '../../atoms'
import { CurrentValueContainer } from '../../molecules'
import { PayPalButton } from 'react-paypal-button-v2'

import { InfoHeading, InfoWrapper, ModalWrapper, PaymentWrapper, ValueWrapper, Wrapper } from './styles'
import { loadStripe } from '@stripe/stripe-js'
import { useAuthContext } from '../../../context'
import { ApiService } from '../../../services'

const stripePromise = loadStripe('pk_test_MqUgoJU32oVHinW1NGjrssdI')

interface PurchaseItemPopupProps {
	open: boolean
	setOpen: (boolean) => void
	item: Auction
}

const PurchaseItemPopup: FC<PurchaseItemPopupProps> = ({ open, setOpen, item = { name: '' } }) => {
	const ref = useRef<HTMLElement>(null)
	const [mounted, setMounted] = useState(false)
	const [modalFocus, setModalFocus] = useState(false)

	const { user } = useAuthContext()

	useEffect(() => {
		ref.current = document.body
		setMounted(true)
	})

	const checkIfClickedOutside = (e: SyntheticEvent) => {
		e.stopPropagation()

		if (!modalFocus) {
			setOpen(false)
		}
	}

	const checkoutWithStripe = async () => {
		const stripe = await stripePromise

		// Call your backend to create the Checkout Session
		const { id } = await ApiService.checkoutAuctionStripe({ id: item.id })

		// When the customer clicks on the button, redirect them to Checkout.
		const result = await stripe.redirectToCheckout({
			sessionId: id,
		})

		if (result.error) {
			// If `redirectToCheckout` fails due to a browser or network
			// error, display the localized error message to your customer
			// using `result.error.message`.
		}
	}

	const login = () => {
		document.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/steam`
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
							<InfoHeading>
								<Heading.H3
									fontSize={[26, 28]}
									fontFamily={'heading'}
									color={'primary'}
									fontWeight={400}
								>
									BIDSKINS
								</Heading.H3>
							</InfoHeading>
							<Img src={item.image} width={'100%'} maxWidth={275} />
							<div />
							<P fontWeight={700} color={'white'} fontSize={[30, 30, 45, 45, 55]}>
								{splitStringInHalf(item.name).first}&nbsp;
								<span>
									<P
										fontWeight={700}
										fontSize={[30, 30, 45, 45, 55]}
										color={'primary'}
										display={'inline'}
									>
										{splitStringInHalf(item.name).last}
									</P>
								</span>
							</P>
							<ValueWrapper>
								<CurrentValueContainer
									label={'Price to Pay'}
									value={item.currentPrice}
									inDollars
								/>
							</ValueWrapper>
						</InfoWrapper>
						<PaymentWrapper>
							{user ? (
								<Fragment>
									<PayPalButton
										amount={item.currentPrice}
										options={{
											disableFunding: 'credit,card',
											clientId:
												'AZTrg8Ymv-Zg09BSjMlz4vXZmlEOLhCNtEb6Hb2KmImWJpw5L9EcBHs1WqfdmtW3OKDhgN6-CpkZcNv0',
										}}
										createOrder={(data, actions) => {
											return actions.order.create({
												purchase_units: [
													{
														amount: {
															currency_code: 'USD',
															value: item.currentPrice,
															breakdown: {
																item_total: {
																	value: item.currentPrice,
																	currency_code: 'USD',
																},
															},
														},
														items: [
															{
																name: `Item`,
																unit_amount: {
																	value: item.currentPrice,
																	currency_code: 'USD',
																},
																quantity: 1,
																sku: `AUCTION-THEID`,
															},
														],
													},
												],
											})
										}}
										shippingPreference={'NO_SHIPPING'}
										onSuccess={async (details, data) => {
											console.log(details, data)
											// await completePaypalPayment(data.orderID, details.payer.payer_id)
										}}
									/>
									<Button
										backgroundColor={'blue-dark'}
										width={'100%'}
										maxWidth={300}
										height={45}
										borderBottomWidth={5}
										borderBottomStyle={'solid'}
										borderBottomColor={'blue-darker'}
										fontWeight={700}
										onClick={checkoutWithStripe}
									>
										CHECKOUT WITH STRIPE
									</Button>
								</Fragment>
							) : (
								<Button
									backgroundColor={'blue-dark'}
									width={'100%'}
									maxWidth={300}
									height={45}
									borderBottomWidth={5}
									borderBottomStyle={'solid'}
									borderBottomColor={'blue-darker'}
									fontWeight={700}
									onClick={login}
								>
									Login to Checkout
								</Button>
							)}
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

export default PurchaseItemPopup
