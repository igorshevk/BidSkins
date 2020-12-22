import { FC } from 'react'
import { Img, P } from '../../atoms'

import { Wrapper } from './styles'

interface NavigationProfileProps {
	profileImage: string
	username: string
	onClick: () => void
}

const NavigationProfile: FC<NavigationProfileProps> = ({ profileImage, username, onClick }) => {
	return (
		<Wrapper onClick={onClick}>
			<Img src={profileImage} height={'100%'} />
			<P fontWeight={700} fontSize={['0.7rem', '0.9rem']} color={'white'}>
				WELCOME&nbsp;
				<span>
					<P fontWeight={700} fontSize={['0.7rem', '0.9rem']} color={'primary'} display={'inline'}>
						BACK
					</P>
				</span>
				&nbsp;{username}!
			</P>
		</Wrapper>
	)
}

export default NavigationProfile
