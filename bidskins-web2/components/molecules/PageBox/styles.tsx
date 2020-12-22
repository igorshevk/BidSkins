import styled from 'styled-components'

export const Wrapper = styled.div`
	width: 100%;
	height: 190px;
	background: url('/img/auctions-bg.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	border-bottom: 1px solid #403e4e;
	display: flex;
	padding: 20px;
	align-items: center;
	justify-content: center;
	text-align: center;

	& > :last-child {
	}

	@media (min-width: 1200px) {
		text-align: start;
		justify-content: space-between;
		align-items: flex-end;
		padding: 50px;
	}
`

export const SocialsWrapper = styled.div`
	align-self: flex-end;

	display: none;
	grid-template-columns: repeat(4, auto);
	grid-gap: 10px;

	@media (min-width: 576px) {
		grid-gap: 25px;
	}

	@media (min-width: 1200px) {
		display: grid;
	}
`
