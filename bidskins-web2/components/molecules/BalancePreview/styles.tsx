import styled from 'styled-components'

export const Wrapper = styled.div``

export const AmountWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	& > :last-child {
		margin-left: 10px;
	}

	& > p > i {
		margin-right: 5px;
	}
`
