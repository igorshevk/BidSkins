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
	width: 300px;
	position: relative;
	max-width: 95%;
	height: min-content;

	background-color: #232329;
	border: 2px solid #464650;
	border-bottom: 2px solid #f8614a;

	display: flex;
	flex-direction: column;

	@media (min-width: 576px) {
		width: 800px;
	}

	@media (min-width: 768px) {
		width: 900px;
		height: 580px;
		flex-direction: row;
	}

	@media (min-width: 1200px) {
		width: 1351px;
		height: 760px;
	}

	& > button {
		position: absolute;
		top: 8px;
		right: 8px;
	}
`

export const InfoWrapper = styled.div`
	width: 100%;
	background: url('/img/payment-background.png');
	background-position: 0px 0px;
	background-size: 101% 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #d84848;

	& > img:nth-child(2) {
		margin-top: 35px;
	}

	@media (min-width: 768px) {
		width: 50%;
		height: 100%;
		border-right: 1px solid #d84848;
		border-bottom: none;
	}

	@media (min-width: 1200px) {
		& > img:nth-child(2) {
			margin-top: 85px;
		}
	}
`

export const InfoHeading = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 10px 10px 0;
	width: calc(100% - 20px);

	& > :first-child {
		display: none;
		visibility: collapse;
	}

	@media (min-width: 576px) {
		margin: 15px 30px 0;
		width: calc(100% - 60px);

		& > :first-child {
			display: block;
			visibility: visible;
		}
	}

	@media (min-width: 768px) {
		margin: 15px 20px 0;
		width: calc(100% - 40px);
	}

	@media (min-width: 1200px) {
		margin: 25px 50px 0;
		width: calc(100% - 100px);
	}
`

export const ValueWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: relative;

	& > img {
		width: 12px;
		height: 21px;
	}

	/* Extra Tokens */
	& > p:last-child {
		position: absolute;
		left: 80%;
		bottom: 15%;
	}

	@media (min-width: 768px) {
		flex-direction: row;

		& > img {
			margin: 15px 30px 0;
		}
		& > p:last-child {
			left: 100%;
			top: 25%;
		}
		.payment-container {
			padding: 20px 30px;
			width: 50%;
		}
	}

	@media (min-width: 1200px) {
		margin-bottom: 25px;
	}
`

export const PaymentWrapper = styled.div`
	padding: 15px 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > h2:first-child {
		align-self: flex-start;
		margin-bottom: 50px;
	}

	& > label {
		margin-bottom: 15px;
	}

	/* Referencing both the paypal button */
	& > div:nth-last-child(2) {
		width: 100%;
		max-width: 300px;
	}

	@media (min-width: 768px) {
		padding: 20px 30px;
		width: 50%;
	}

	@media (min-width: 1200px) {
		padding: 30px 75px;

		& > :last-child {
			margin-top: 10px;
		}
	}
`
