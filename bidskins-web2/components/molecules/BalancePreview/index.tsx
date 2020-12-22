import { FC } from 'react'
import { Icon, P } from '../../atoms'

import { AmountWrapper, Wrapper } from './styles'

interface BalancePreviewProps {
	tokens: number
}

const BalancePreview: FC<BalancePreviewProps> = ({ tokens = 0 }) => {
	return (
		<Wrapper>
			<P fontWeight={700} fontSize={'1.1rem'} color={'white'}>
				Current&nbsp;
				<span>
					<P fontWeight={700} fontSize={'1.1rem'} color={'primary'} display={'inline'}>
						Balance
					</P>
				</span>
			</P>
			<AmountWrapper>
				<P fontSize={'0.8rem'} color={'white'} fontWeight={700}>
					<Icon className={'fas fa-dollar-sign'} fontSize={'0.8rem'} />
					{tokens} tokens
				</P>
			</AmountWrapper>
		</Wrapper>
	)
}

export default BalancePreview
