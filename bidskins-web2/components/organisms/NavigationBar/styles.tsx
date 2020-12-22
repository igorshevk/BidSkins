import styled from 'styled-components'

export const Wrapper = styled.div`
	border-bottom: 1px solid #fb4839;
`

export const TopWrapper = styled.div`
	height: 50px;
	display: flex;
	align-items: center;
	background-color: #1e1e24;

	/* Hamburger Button */
	& > button:first-child {
		display: flex;
	}

	@media (min-width: 1200px) {
		& > button:first-child {
			display: none;
		}
	}

	& > :nth-child(2) {
		visibility: collapse;
		display: none;
	}

	& > :nth-child(3) {
		visibility: collapse;
		display: none;
	}

	& > :last-child {
		margin-left: auto;
		margin-right: 20px;
	}

	@media (min-width: 425px) {
		& > :nth-child(3) {
			visibility: visible;
			display: block;
		}
	}

	@media (min-width: 1200px) {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-items: center;
		align-content: center;

		/* Hamburger Menu collapsed on desktop view */
		& > :first-child {
			visibility: collapse;
			display: none;
		}

		/* Profile Preview visible on desktop */
		& > :nth-child(2) {
			visibility: visible;
			display: flex;
			margin-right: auto;
			margin-left: 50px;
		}

		& > :last-child {
			margin-left: auto;
			margin-right: 50px;
		}
	}
`

export const BottomWrapper = styled.div`
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #1c1c20;

	& > :last-child {
		display: none;
	}

	@media (min-width: 1200px) {
		& > :first-child {
			display: none;
		}

		& > :last-child {
			display: flex;
		}
	}
`

export const MenuMobileWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0 20px;

	/* The socials stuff, hide it, takes too much space on super small phones */
	& > :nth-child(2) {
		display: none;
	}

	@media (min-width: 576px) {
		/* Bring back the socials stuff afterwards */
		& > :nth-child(2) {
			display: flex;
		}
	}
`

export const MenuPrimaryWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
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
