import { FC } from 'react'
import { Button, P } from '../../atoms'

import { AuctionBidCountWrapper, Wrapper } from './styles'

interface AuctionBidButtonProps {
	count: number
	onClick: () => void
	disabled: boolean
}

const AuctionBidButton: FC<AuctionBidButtonProps> = ({ count, onClick, disabled }) => {
	return (
		<Wrapper>
			<AuctionBidCountWrapper disabled={disabled}>
				<P>{count}</P>
			</AuctionBidCountWrapper>
			<Button
				onClick={onClick}
				backgroundColor={'blue-dark'}
				width={'100%'}
				maxWidth={300}
				height={45}
				borderBottomWidth={5}
				borderBottomStyle={'solid'}
				borderBottomColor={'blue-darker'}
				disabled={disabled}
			>
				Place Bid
			</Button>
		</Wrapper>
	)
}

export default AuctionBidButton
