import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	height: 24px;

	& > :first-child {
		margin-right: 10px;
	}

	@media (min-width: 576px) {
		height: 32px;
	}
`
