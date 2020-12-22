import styled from 'styled-components'

export const Wrapper = styled.div`
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > :nth-child(2) {
		margin: 10px 0 20px;
	}
`
