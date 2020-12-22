import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #1e1e24;
	padding: 20px;

	@media (min-width: 1200px) {
		flex-direction: row;
		justify-content: flex-start;
		padding: 0 50px;

		/* Socials Container */
		& > :last-child {
			margin-left: auto;
		}
	}
`

export const LinksWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
	margin: 10px 0;

	& > a {
		padding: 0 5px;
		font-size: 0.8rem;
	}

	@media (min-width: 576px) {
		flex-wrap: nowrap;
		justify-content: flex-start;
		margin: unset;
	}

	@media (min-width: 1200px) {
		margin-left: 50px;

		& > a {
			font-size: 0.9rem;
		}
	}
`

export const SocialsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, auto);
	grid-gap: 10px;

	@media (min-width: 576px) {
		grid-gap: 25px;
	}

	@media (min-width: 1200px) {
		display: grid;
	}
`
