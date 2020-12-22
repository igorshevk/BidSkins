import { FC, useState } from 'react'
import { Heading, Img } from '../../atoms'

import { ContentWrapper, HeaderWrapper, Wrapper } from './styles'

interface AccordionItemProps {
	heading: string
}

const AccordionItem: FC<AccordionItemProps> = ({ heading, children }) => {
	const [opened, setOpened] = useState(false)

	return (
		<Wrapper>
			<HeaderWrapper onClick={() => setOpened((opened) => !opened)}>
				<Heading.H2 fontSize={[24, 24, 24, 26]} color={'primary'}>
					{heading}
				</Heading.H2>
				<Img src={'/img/accordion-arrow.png'} transform={opened && 'scaleY(-1)'} />
			</HeaderWrapper>
			<ContentWrapper opened={opened}>{opened && children}</ContentWrapper>
		</Wrapper>
	)
}

export default AccordionItem
