import styled from 'styled-components'

interface WrapperProps {
	open: boolean
}

export const Wrapper = styled.aside<WrapperProps>`
	display: ${({ open }) => (open ? 'flex' : 'none')};
	justify-content: center;

	background-color: rgba(0, 0, 0, 0.5);

	width: 100%;
	height: 100%;
	position: fixed;

	top: 0;

	padding-top: 20px;
	padding-bottom: 20px;

	z-index: 999999;
	overflow-y: scroll;
	overflow-x: hidden;

	@media (min-width: 768px) {
		overflow-y: auto;
		padding-top: 100px;
		padding-bottom: 0;
	}
`

export const ModalWrapper = styled.div`
	width: 500px;
	position: relative;
	max-width: 95%;
	height: min-content;

	background-color: #232329;
	border: 2px solid #464650;
	border-bottom: 2px solid #f8614a;

	display: flex;

	@media (min-width: 768px) {
		width: 800px;
		height: 580px;
	}

	@media (min-width: 1200px) {
		width: 1351px;
		height: 600px;
	}

	& > button {
		position: absolute;
		top: 8px;
		right: 8px;
	}
`

export const TradeWrapper = styled.div`
	display: flex;
	padding: 20px 10px;
	flex-direction: column;
`

export const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;

	background-color: #232329;

	& > div {
		border-right: 1px solid #464650;
		width: 100%;
	}

	@media (min-width: 768px) {
		width: auto;

		& > div {
			width: auto;
		}
		/* Disable vertical profile container for tablets and above */
		& > div > ${TradeWrapper} {
			display: none;
			visibility: collapse;
		}
	}
`

export const UserWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid #464650;

	& > p {
		margin-top: 10px;
		margin-bottom: 2px;
	}

	@media (min-width: 768px) {
		width: 195px;
	}
`

export const ValueWrapper = styled.div`
	padding: 20px;
	border-bottom: 1px solid #464650;

	@media (min-width: 768px) {
		border-bottom: none;
	}
`

export const UpdateUrlWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;

	& > div:first-child {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 7px;
		text-align: center;
	}

	@media (min-width: 768px) {
		margin-bottom: 7px;
	}
`

export const TradeInputButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`

export const UrlInstructionsWrapper = styled.div`
	width: 100%;
	text-align: center;
`

export const InfoWrapper = styled.div`
	display: none;
	flex-direction: column;
	width: 100%;

	@media (min-width: 768px) {
		display: flex;
	}
`

export const ProfileTableHeader = styled.div`
	height: 61px;
	width: 100%;
	display: grid;
	grid-template-columns: 75px 135px 75px;
	grid-template-rows: 1fr;
	grid-gap: 50px;
	align-items: center;
	justify-items: end;
	padding-left: 10px;
	border-bottom: 1px solid #3e3e3e;

	& > :nth-child(2) {
		justify-self: start;
	}

	& > :nth-child(5) {
		justify-self: start;
	}

	@media (min-width: 768px) {
		grid-template-columns: 75px 200px 75px;
		grid-gap: 75px;

		& > :nth-child(n + 4) {
			display: none;
			visibility: collapse;
		}
	}

	@media (min-width: 1200px) {
		grid-gap: 100px;
		grid-template-columns: 75px 200px 75px 175px;

		& > :nth-child(4) {
			display: block;
			visibility: visible;
		}
		& > :nth-child(5) {
			display: none;
			visibility: collapse;
		}
	}

	@media (min-width: 1300px) {
		grid-template-columns: 75px 200px 75px 175px 75px;

		& > :nth-child(5) {
			display: block;
			visibility: visible;
		}
	}
`

export const ProfileTableValuesWrapper = styled.div`
	margin-top: auto;
	/* React Window already handles this */
	overflow-y: hidden;

	height: 100%;
	max-height: 400px;
	border-bottom: 1px solid #3e3e3e;

	& div {
		scrollbar-width: thin;
	}

	/* React Window already handles this, so we are applying it to the scroll */
	& div::-webkit-scrollbar {
		width: 6px;
		background-color: rgb(36, 37, 53);
	}

	& div::-webkit-scrollbar-thumb {
		background-color: rgb(122, 122, 132);
	}

	& div::-webkit-scrollbar-thumb:hover {
		background-color: rgb(103, 103, 113);
	}

	& div::-webkit-scrollbar-thumb:active {
		background-color: rgb(69, 69, 79);
	}

	::-webkit-scrollbar-track-piece {
		background-color: rgb(30, 30, 36);
	}
`

export const AuctionWinningsHeader = styled.div`
	height: 61px;
	width: 100%;
	display: grid;
	grid-template-columns: 75px 135px 75px;
	grid-template-rows: 1fr;
	grid-gap: 50px;
	align-items: center;
	justify-items: end;
	padding-left: 10px;
	border-bottom: 1px solid #3e3e3e;

	& > :nth-child(2) {
		justify-self: start;
	}

	& > :nth-child(5) {
		justify-self: start;
	}

	@media (min-width: 768px) {
		grid-template-columns: 75px 75px 175px;
		grid-gap: 75px;

		& > :nth-child(n + 4) {
			display: none;
			visibility: collapse;
		}
	}

	@media (min-width: 1200px) {
		grid-gap: 100px;
		grid-template-columns: 75px 75px 175px 75px;

		& > :nth-child(4) {
			display: block;
			visibility: visible;
		}
		& > :nth-child(5) {
			display: none;
			visibility: collapse;
		}
	}

	@media (min-width: 1300px) {
		grid-template-columns: 75px 75px 175px 75px 200px;

		& > :nth-child(5) {
			display: block;
			visibility: visible;
		}
	}
`

export const ProfileSideNav = styled.div`
	width: 45px;
	border-left: 1px solid #464650;
	background: #232329;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (min-width: 768px) {
		/* For some reason, height 100% isn't the same on mobile, therefore we do this */

		height: 100%;
	}

	& > button {
		margin: 7px 0;
	}
`
