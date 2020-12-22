import { FC } from 'react'
import { P } from '../../atoms'

import { Wrapper } from './styles'

interface AuctionStat {
	description: string
	value: number | string
}

interface AuctionStatsProps {
	stats: AuctionStat[]
}

const AuctionStats: FC<AuctionStatsProps> = ({ stats = [] }) => {
	return (
		<Wrapper>
			{stats.map((stat) => (
				<P fontWeight={700} fontSize={'0.95rem'} color={'primary'} key={stat.description}>
					{stat.value}&nbsp;
					<span>
						<P fontWeight={700} fontSize={'0.95rem'} color={'white'} display={'inline'}>
							{stat.description}
						</P>
					</span>
				</P>
			))}
		</Wrapper>
	)
}

export default AuctionStats
