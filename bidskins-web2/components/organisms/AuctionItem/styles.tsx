import styled from 'styled-components'

export const Wrapper = styled.div`
	flex: auto;
	text-align: center;
	border: 1px solid #fb4839;
	padding-top: 20px;
	margin-top: 20px;
	width: 100%;

	& > p:nth-child(2) {
		position: relative;
		top: 10px;
		z-index: 1;
	}
`

export const ImageWrapper = styled.div`
	background: url('/img/item-bg.jpg');
	background-repeat: repeat;
	background-size: auto;
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 30px;
	position: relative;

	/* Time Left */
	& > :nth-child(2) {
		right: 0;
		bottom: 20px;
	}

	/* Worth */
	& > :nth-child(3) {
		left: 0;
		bottom: 20px;
	}

	/* Bid Cost */
	& > :nth-child(4) {
		left: 0;
		bottom: 90px;
	}
`

interface AuctionItemInfoWrapperProps {
	big?: boolean
}

export const AuctionItemInfoWrapper = styled.div<AuctionItemInfoWrapperProps>`
	position: absolute;
	width: ${({ big }) => (big ? 100 : 90)}px;
	height: ${({ big }) => (big ? 60 : 50)}px;
	background-color: #1e1e23;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-weight: bold;

	& > :first-child {
		margin-bottom: 3px;
	}
`

export const InfoWrapper = styled.div`
	padding: 30px;
	background-color: #1c1c20;
`
