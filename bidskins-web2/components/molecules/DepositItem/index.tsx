import { FC } from 'react'
import { Img, P } from '../../atoms'

import { ImageWrapper, SelectedWrapper, Wrapper } from './styles'

interface DepositItemProps {
	image: string
	price: number
	selected: boolean
	onClick: () => void
}

const DepositItem: FC<DepositItemProps> = ({ image, price, selected, onClick }) => {
	return (
		<Wrapper selected={selected} onClick={onClick}>
			<ImageWrapper>
				<Img src={image} width={'auto'} height={'100%'} />
			</ImageWrapper>
			<SelectedWrapper>
				<P fontSize={11} fontWeight={700}>
					${price.toFixed(2)}
				</P>
				<P fontSize={9.5} color={'gray-lightest'}>
					{selected ? 'SELECTED' : 'SELECT'}
				</P>
			</SelectedWrapper>
		</Wrapper>
	)
}

export default DepositItem
