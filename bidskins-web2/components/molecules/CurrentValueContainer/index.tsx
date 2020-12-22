import { FC } from 'react'
import { P } from '../../atoms'

import { Wrapper } from './styles'

interface CurrentValueContainerProps {
	label: string
	value: number
	inDollars?: boolean
}

const CurrentValueContainer: FC<CurrentValueContainerProps> = ({ label, value, inDollars }) => {
	const normalizedValue =
		typeof value !== 'number'
			? inDollars
				? '__.__'
				: '_____' // picks based on format, is it dollars or tokens
			: inDollars
			? value.toFixed(2)
			: value // Value has a number associated with it

	return (
		<Wrapper>
			<P
				fontSize={['0.95rem', '0.95rem', '0.95rem', '1rem']}
				fontWeight={700}
				color={'gray-light'}
				textAlign={'center'}
			>
				{label}
			</P>
			<P fontSize={['2rem', '2rem', '2rem', '2.5rem']} fontWeight={700} textAlign={'center'}>
				{inDollars ? '$' : null}
				{normalizedValue}
			</P>
		</Wrapper>
	)
}

export default CurrentValueContainer
