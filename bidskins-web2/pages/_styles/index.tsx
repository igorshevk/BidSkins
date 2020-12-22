import styled from 'styled-components'

export const ItemsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: 1fr;
	padding: 0 20px;
	grid-gap: 20px;

	@media (min-width: 768px) {
		padding: 0 20px;
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		padding: 0 50px;
		grid-template-columns: 1fr 1fr 1fr;
	}
`
