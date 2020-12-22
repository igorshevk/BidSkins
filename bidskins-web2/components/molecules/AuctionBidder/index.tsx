import { FC } from 'react'
import { Img, P, VerticalDivider } from '../../atoms'

import { Wrapper } from './styles'

interface AuctionBidderProps {
	image: string
	name: string
}

const AuctionBidder: FC<AuctionBidderProps> = ({ image, name }) => {
	return (
		<Wrapper>
			<P fontWeight={700} color={'white'}>
				HIGHEST&nbsp;
				<br />
				<span>
					<P fontWeight={700} color={'primary'} display={'inline'}>
						BIDDER
					</P>
				</span>
			</P>
			<VerticalDivider />
			<Img src={image} width={32} height={32} />
			<P color={'white'} fontWeight={700} fontSize={'0.95rem'}>
				{name}
			</P>
		</Wrapper>
	)
}

export default AuctionBidder
