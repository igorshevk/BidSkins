import { FC } from 'react'

import NextLink from 'next/link'
import { Icon, NavLink, P } from '../../atoms'

import { LinksWrapper, SocialsWrapper, Wrapper } from './styles'

const Footer: FC = () => {
	const currentYear = new Date().getFullYear()

	return (
		<Wrapper>
			<P
				textTransform={'uppercase'}
				fontSize={'0.9rem'}
				fontWeight={700}
				color={'gray-lighter'}
				textAlign={'center'}
			>
				Copyright © Bidskins 2019-{currentYear}. All rights reserved
			</P>
			<LinksWrapper>
				<NextLink href={'/'} passHref>
					<NavLink>
						<Icon className={'fas fa-dollar-sign'} />
						SELL ITEMS
					</NavLink>
				</NextLink>
				<NextLink href={'/'} passHref>
					<NavLink>
						<Icon className={'fas fa-shopping-cart'} />
						HOW TO BUY
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
			</LinksWrapper>
			<SocialsWrapper>
				<Icon className={'fab fa-steam-symbol'} fontSize={'1.3rem'} />
				<Icon className={'fab fa-instagram'} fontSize={'1.3rem'} />
				<Icon className={'fab fa-twitter'} fontSize={'1.3rem'} />
				<Icon className={'fab fa-discord'} fontSize={'1.3rem'} />
			</SocialsWrapper>
		</Wrapper>
	)
}

export default Footer
