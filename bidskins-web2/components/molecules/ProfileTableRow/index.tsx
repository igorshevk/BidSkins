import { CSSProperties, FC, Fragment } from 'react'
import { capitalizeFirstLetter, Transaction } from '../../../utils'
import { P } from '../../atoms'

import { Wrapper } from './styles'

interface ProfileTableRowProps {
	status: string
	data: {
		isItemLoaded: (index: number) => boolean
		transactions: Transaction[]
	}
	index: number
	style: CSSProperties
}

const ProfileTableRow: FC<ProfileTableRowProps> = ({
	status = '————',
	data: { isItemLoaded, transactions },
	index,
	style,
}) => {
	const { id, type, tokens, createdAt, auction } = (isItemLoaded(index)
		? transactions[index]
		: {}) as Transaction

	return (
		<Wrapper loading={!isItemLoaded(index)} style={style}>
			{!isItemLoaded(index) ? (
				<P color={'white'} fontSize={17}>
					Loading...
				</P>
			) : (
				<Fragment>
					<P color={'white'} fontSize={17}>
						{id}
					</P>
					<P color={'white'} fontSize={17}>
						{capitalizeFirstLetter(type)}
						{auction ? ` - ${auction.name}` : ''}
					</P>
					<P color={'white'} fontSize={17}>
						{tokens}
					</P>
					<P color={'white'} fontSize={17}>
						{new Date(createdAt).toLocaleString()}
					</P>
					<P color={status === 'Won' ? 'success' : 'white'} fontSize={17}>
						{status}
					</P>
				</Fragment>
			)}
		</Wrapper>
	)
}

export default ProfileTableRow
