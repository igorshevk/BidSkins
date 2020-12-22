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

	@media (min-width: 768px) {
		width: calc(50% - 20px);
		margin-left: 20px;

		&:nth-child(2n + 1) {
			margin-left: unset;
		}
	}

	@media (min-width: 1600px) {
		width: calc(33% - 20px);
		margin-left: 20px;

		/* Overwrites the previous one by adding a margin to the second one */
		&:nth-child(2n + 1) {
			margin-left: 20px;
		}
		&:nth-child(3n + 1) {
			margin-left: unset;
		}
		& > p:nth-child(2) {
			top: 11px;
		}
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
	height: 225px;
`

export const InfoWrapper = styled.div`
	padding: 15px 0 30px;
	background-color: #1c1c20;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const WorthWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;

	& > img {
		margin: 15px 30px 0;
	}

	/* Extra Tokens */
	& > :nth-child(4) {
		left: 100%;
	}
`
