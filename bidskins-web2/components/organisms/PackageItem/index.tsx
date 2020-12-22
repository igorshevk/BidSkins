import { FC } from 'react'
import { Button, Img, P } from '../../atoms'
import { CurrentValueContainer } from '../../molecules'

import { ImageWrapper, InfoWrapper, WorthWrapper, Wrapper } from './styles'
import { PackageItemParam } from '@app-types'

interface PackageItemProps extends PackageItemParam {
	purchaseAction: (packageItem: PackageItemParam) => void
}

const PackageItem: FC<PackageItemProps> = ({
	id,
	name,
	totalTokens,
	extraTokens = 0,
	price,
	image,
	purchaseAction,
}) => {
	return (
		<Wrapper>
			<P fontSize={['1.5rem', '1.5rem', '1.5rem', '1.5rem', '2rem']} fontWeight={700} color={'white'}>
				{name}
			</P>
			<P
				fontSize={['1rem', '1rem', '1rem', '1rem', '1.1rem']}
				fontWeight={700}
				color={'primary'}
				textTransform={'uppercase'}
			>
				{totalTokens || '————'}
			</P>
			<ImageWrapper>
				<Img src={image} objectFit={'cover'} width={'100%'} maxWidth={275} />
			</ImageWrapper>
			<InfoWrapper>
				<WorthWrapper>
					<CurrentValueContainer label={'Current Price'} value={price || null} inDollars />
					<Img src={'/img/rightarrowhead.png'} />
					<CurrentValueContainer label={'Current Tokens'} value={totalTokens - extraTokens || null} />
					{extraTokens > 0 && (
						<P fontSize={27} fontWeight={700} color={'primary'}>
							+{extraTokens}
						</P>
					)}
				</WorthWrapper>
				<Button
					backgroundColor={'blue-dark'}
					width={'100%'}
					maxWidth={[300, 300, 300, 350]}
					height={45}
					borderBottomWidth={5}
					borderBottomStyle={'solid'}
					borderBottomColor={'blue-darker'}
					fontWeight={700}
					onClick={() => purchaseAction({ id, name, totalTokens, extraTokens, price, image })}
				>
					BUY {totalTokens || '_____'} TOKENS
				</Button>
			</InfoWrapper>
		</Wrapper>
	)
}

export default PackageItem
