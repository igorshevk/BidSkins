import { FC, useState } from 'react'
import NextLink from 'next/link'
import { Button, Icon, Img, Link, NavLink, P } from '../../atoms'
import { BalancePreview, MobileNav, NavigationProfile } from '../../molecules'

import {
	BottomWrapper,
	MenuMobileWrapper,
	MenuPrimaryWrapper,
	SocialsWrapper,
	TopWrapper,
	Wrapper,
} from './styles'
import { useAuthContext, useSocketContext } from '../../../context'
import ProfilePopup from '../ProfilePopup'

interface NavigationBarProps {}

const NavigationBar: FC<NavigationBarProps> = () => {
	const { user } = useAuthContext()
	const { tokens } = useSocketContext()

	const [profilePopupOpen, setProfilePopupOpen] = useState(false)
	const [mobileNavOpen, setMobileNavOpen] = useState(false)

	return (
		<Wrapper>
			<TopWrapper>
				<Button
					backgroundColor={'gray-dark'}
					width={80}
					height={'100%'}
					marginRight={20}
					onClick={() => setMobileNavOpen(true)}
				>
					<Icon className={'fas fa-bars'} color={'white'} fontSize={'1.7rem'} />
				</Button>
				{user ? (
					<NavigationProfile
						profileImage={user.avatar}
						username={user.username}
						onClick={() => setProfilePopupOpen(true)}
					/>
				) : (
					<div />
				)}
				<P fontFamily={'heading'} color={'primary'} fontSize={[18, 21]}>
					BIDSKINS
				</P>
				{user ? (
					<BalancePreview tokens={tokens} />
				) : (
					<Link display={'flex'} href={`${process.env.NEXT_PUBLIC_API_URL}/auth/steam`}>
						<Img src={'/img/steamloginbutton.png'} />
					</Link>
				)}
			</TopWrapper>
			<BottomWrapper>
				<MenuMobileWrapper>
					{user ? (
						<NavigationProfile
							profileImage={user.avatar}
							username={user.username}
							onClick={() => setProfilePopupOpen(true)}
						/>
					) : (
						<div />
					)}
					<SocialsWrapper>
						<Icon className={'fab fa-steam-symbol'} fontSize={'1.3rem'} />
						<Icon className={'fab fa-instagram'} fontSize={'1.3rem'} />
						<Icon className={'fab fa-twitter'} fontSize={'1.3rem'} />
						<Icon className={'fab fa-discord'} fontSize={'1.3rem'} />
					</SocialsWrapper>
				</MenuMobileWrapper>
				<MenuPrimaryWrapper>
					<NextLink href={'/'} passHref>
						<NavLink>
							<Icon className={'fas fa-home'} />
							HOME
						</NavLink>
					</NextLink>
					<NextLink href={'/packages'} passHref>
						<NavLink>
							<Icon className={'fas fa-box-open'} />
							PACKAGES
						</NavLink>
					</NextLink>
					<NextLink href={'/'} passHref>
						<NavLink>
							<Icon className={'fas fa-dollar-sign'} />
							SELL ITEMS
						</NavLink>
					</NextLink>
					<NextLink href={'/'} passHref>
						<NavLink>
							<Icon className={'fas fa-shopping-cart'} />
							HOW TO PLAY
						</NavLink>
					</NextLink>
					<NextLink href={'/faq'} passHref>
						<NavLink>
							<Icon className={'fas fa-question'} />
							FAQ
						</NavLink>
					</NextLink>
					<NextLink href={'/contact'} passHref>
						<NavLink>
							<Icon className={'far fa-envelope'} />
							CONTACT
						</NavLink>
					</NextLink>
				</MenuPrimaryWrapper>
			</BottomWrapper>
			<MobileNav open={mobileNavOpen} setOpen={setMobileNavOpen} />
			<ProfilePopup open={profilePopupOpen} setOpen={setProfilePopupOpen} />
		</Wrapper>
	)
}

export default NavigationBar
