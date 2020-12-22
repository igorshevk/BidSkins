import { FC } from 'react'
import { Heading, Icon, P } from '../../atoms'

import { SocialsWrapper, Wrapper } from './styles'

interface PageBoxProps {
	page: string
	startText?: string
	importantText?: string
	endText?: string
}

const PageBox: FC<PageBoxProps> = ({ page, startText, importantText, endText }) => {
	return (
		<Wrapper>
			<div>
				<Heading.H3 fontSize={'3rem'} fontWeight={400} color={'primary'}>
					{page || 'AUCTIONS'}
				</Heading.H3>

				<P fontWeight={700} fontSize={'0.95rem'}>
					{startText ?? 'Save up to'}&nbsp;
					<span>
						<P fontWeight={700} fontSize={'0.95rem'} color={'primary'} display={'inline'}>
							{importantText ?? '99%'}&nbsp;
						</P>
					</span>
					{endText ?? 'with hundreds of auctions running daily'}
				</P>
			</div>
			<SocialsWrapper>
				<Icon className={'fab fa-steam-symbol'} fontSize={'1.3rem'} />
				<Icon className={'fab fa-instagram'} fontSize={'1.3rem'} />
				<Icon className={'fab fa-twitter'} fontSize={'1.3rem'} />
				<Icon className={'fab fa-discord'} fontSize={'1.3rem'} />
			</SocialsWrapper>
		</Wrapper>
	)
}

export default PageBox
