import { FC } from 'react'
import { Auction } from '../../../utils'
import { Img, P } from '../../atoms'

import { Wrapper } from './styles'

interface PurchaseItemPopupProps {
	data: Auction
	onClick: () => void
}

const AuctionWinningsRow: FC<PurchaseItemPopupProps> = ({ data, onClick }) => {
	const { id, name, image, currentPrice, paymentDeadline } = data

	return (
		<Wrapper onClick={onClick}>
			<P color={'white'} fontSize={17}>
				{id}
			</P>
			<Img src={image} width={32} height={32} />
			<P color={'white'} fontSize={17}>
				{name}
			</P>
			<P color={'white'} fontSize={17}>
				${currentPrice.toFixed(2)}
			</P>
			<P color={'white'} fontSize={17}>
				{new Date(paymentDeadline).toLocaleString()}
			</P>
		</Wrapper>
	)
}

export default AuctionWinningsRow
