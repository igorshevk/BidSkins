import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	font-weight: bold;
	background-color: #212127;
	border-bottom: 1px solid #403e4e;
	padding: 10px 50px;
	font-size: 0.95rem;

	& > :first-child {
		margin-right: unset;
	}

	& > :not(:first-child) {
		margin-left: 20px;
	}

	@media (min-width: 1200px) {
		display: flex;
		flex-direction: row;

		& > :first-child {
			margin-right: auto;
		}
	}
`
