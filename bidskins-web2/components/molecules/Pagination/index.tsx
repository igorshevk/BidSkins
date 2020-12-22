import { Dispatch, FC, SetStateAction } from 'react'
import { Button, Img, P } from '../../atoms'

import { Wrapper } from './styles'

interface PaginationProps {
	currentPage: number
	setPage: Dispatch<SetStateAction<number>>
	totalPages: number
}

const Pagination: FC<PaginationProps> = ({ currentPage, setPage, totalPages }) => {
	return (
		<Wrapper>
			<Button
				width={38}
				height={'100%'}
				borderRightWidth={1}
				borderRightStyle={'solid'}
				borderRightColor={'primary'}
				onClick={() => (currentPage > 1 ? setPage((page) => page - 1) : null)}
			>
				<Img src={'/img/leftpagination.png'} width={14} />
			</Button>
			<P fontWeight={700}>
				{currentPage} of {totalPages}
			</P>
			<Button
				width={38}
				height={'100%'}
				borderLeftWidth={1}
				borderLeftStyle={'solid'}
				borderLeftColor={'primary'}
				onClick={() => (currentPage < totalPages ? setPage((page) => page + 1) : null)}
			>
				<Img src={'/img/rightpagination.png'} width={14} />
			</Button>
		</Wrapper>
	)
}

export default Pagination
