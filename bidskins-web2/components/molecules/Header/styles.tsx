import styled from 'styled-components'

export const Wrapper = styled.header`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	border-bottom: 1px solid #403e4e;

	& > :nth-child(1) {
		display: block;
	}

	& > :nth-child(2) {
		visibility: collapse;
		display: none;
	}

	@media (min-width: 576px) {
		& > :nth-child(1) {
			display: none;
			visibility: collapse;
		}

		& > :nth-child(2) {
			display: block;
			visibility: visible;
		}
	}
`
