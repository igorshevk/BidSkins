import { FC } from 'react'
import { Img } from '../../atoms'

import { Wrapper } from './styles'

interface HeaderProps {
	image: string
	mobileImage: string
}

const Header: FC<HeaderProps> = ({ image, mobileImage }) => {
	return (
		<Wrapper>
			<Img src={mobileImage} width={'100%'} />
			<Img src={image} width={'100%'} />
		</Wrapper>
	)
}

export default Header
