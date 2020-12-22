import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { splitStringInHalf } from '../../../utils'
import { Button, Heading, Img, P } from '../../atoms'
import { CurrentValueContainer } from '../../molecules'
import { PayPalButton } from 'react-paypal-button-v2'

import { InfoHeading, InfoWrapper, ModalWrapper, PaymentWrapper, ValueWrapper, Wrapper } from './styles'
import { loadStripe } from '@stripe/stripe-js'
import { useAuthContext } from '../../../context'
import { ApiService } from '../../../services'

import { PackageItemParam } from '@app-types'

const stripePromise = loadStripe('pk_test_MqUgoJU32oVHinW1NGjrssdI')

interface PurchasePackagePopupProps {
	open: boolean
	setOpen: (boolean) => void
	item: PackageItemParam
}

const PurchasePackagePopup: FC<PurchasePackagePopupProps> = ({ open, setOpen, item }) => {
	const ref = useRef<HTMLElement>(null)
	const [mounted, setMounted] = useState(false)
	const [modalFocus, setModalFocus] = useState(false)

	const { user } = useAuthContext()

	useEffect(() => {
		ref.current = document.body
		setMounted(true)
	})

	const checkIfClickedOutside = () => {
		if (!modalFocus) {
			setOpen(false)
		}
	}

	const checkoutWithStripe = async () => {
		const stripe = await stripePromise

		// Call your backend to create the Checkout Session
		const { id } = await ApiService.checkoutTokensStripe({ id: item.id })

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
							<Img src={item.image} width={'100%'} maxWidth={[275, 275, 325, 350, 450]} />
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
								<CurrentValueContainer label={'Current Price'} value={item.price} inDollars />
								{item.totalTokens && (
									<Fragment>
										<Img src={'/img/rightarrowhead.png'} />
										<CurrentValueContainer
											label={'Current Tokens'}
											value={item.totalTokens ? item.totalTokens - item.extraTokens : null}
										/>
										{item.extraTokens > 0 && (
											<P fontSize={27} fontWeight={700} color={'primary'}>
												+{item.extraTokens}
											</P>
										)}
									</Fragment>
								)}
							</ValueWrapper>
						</InfoWrapper>
						<PaymentWrapper>
							{user ? (
								<Fragment>
									<PayPalButton
										amount={item.price}
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
															value: item.price,
															breakdown: {
																item_total: {
																	value: item.price,
																	currency_code: 'USD',
																},
															},
														},
														items: [
															{
																name: `${item.totalTokens} Tokens`,
																unit_amount: {
																	value: item.price,
																	currency_code: 'USD',
																},
																quantity: 1,
																sku: `TOKENS-${item.totalTokens}`,
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

export default PurchasePackagePopup
