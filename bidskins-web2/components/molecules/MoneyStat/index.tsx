import { FC } from 'react'
import { P } from '../../atoms'

import { Wrapper } from './styles'

interface MoneyStatProps {
	label: string
	value: number
}

const MoneyStat: FC<MoneyStatProps> = ({ label, value }) => {
	return (
		<Wrapper>
			<P fontWeight={700} fontSize={26} color={'primary'} display={'flex'} alignItems={'center'}>
				$&nbsp;
				<span>
					<P fontWeight={700} fontSize={42} color={'white'} display={'inline'}>
						{value.toFixed(2)}
					</P>
				</span>
			</P>
			<P fontSize={['0.95rem', '0.95rem', '0.95rem', '1rem']} fontWeight={700} color={'gray-light'}>
				{label}
			</P>
		</Wrapper>
	)
}

export default MoneyStat
