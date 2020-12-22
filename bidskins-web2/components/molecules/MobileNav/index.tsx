import { FC, useState } from 'react'
import NextLink from 'next/link'
import { Button, Icon, NavLink } from '../../atoms'

import { NavWrapper, Wrapper } from './styles'

interface MobileNavProps {
	open: boolean
	setOpen: (newOpen: boolean) => void
}

const MobileNav: FC<MobileNavProps> = ({ open, setOpen }) => {
	const [modalFocus, setModalFocus] = useState(false)

	const checkIfClickedOutside = () => {
		if (!modalFocus) {
			setOpen(false)
		}
	}

	return (
		<Wrapper open={open} onClick={checkIfClickedOutside}>
			<NavWrapper
				open={open}
				onMouseLeave={() => setModalFocus(false)}
				onMouseEnter={() => setModalFocus(true)}
			>
				<Button
					backgroundColor={'gray-dark'}
					width={80}
					height={45}
					onClick={() => setOpen(false)}
					alignSelf={'flex-end'}
				>
					<Icon className={'fas fa-times'} color={'white'} fontSize={'1.7rem'} />
				</Button>
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
			</NavWrapper>
		</Wrapper>
	)
}

export default MobileNav
