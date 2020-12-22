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

	& > :first-child {
		display: none;
		position: absolute;
		left: 38px;
		top: 40px;
		z-index: 9;
	}

	@media (min-width: 768px) {
		width: 50%;
		height: 100%;
		border-right: 1px solid #d84848;
		border-bottom: none;
	}

	@media (min-width: 1200px) {
		& > :first-child {
			display: block;
		}
	}
`

export const DepositWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 35px 0;
	height: 100%;

	@media (min-width: 1200px) {
		width: 541px;
		padding: 71px 24px 26px;
		background: rgba(30, 30, 36, 0.78);
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		margin: 20px 0;
	}
`

export const DepositHeading = styled.div`
	@media (min-width: 768px) {
		display: flex;
	}
`

export const ItemsWrapper = styled.div`
	margin-top: 20px;
	display: grid;
	grid-template-columns: repeat(3, 90px);
	grid-template-rows: repeat(3, 90px);
	grid-gap: 5px;

	@media (min-width: 576px) {
		grid-template-columns: repeat(5, 90px);
		grid-template-rows: repeat(5, 90px);
	}

	@media (min-width: 768px) {
		grid-template-columns: repeat(4, 80px);
		grid-template-rows: repeat(4, 80px);
	}

	@media (min-width: 1200px) {
		margin-top: 20px;
		display: grid;
		grid-template-columns: repeat(5, 94px);
		grid-template-rows: repeat(5, 94px);
		grid-gap: 5px;
	}
`

export const OptionsWrapper = styled.div`
	& > * {
		margin-bottom: 5px;
	}

	@media (min-width: 576px) {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	@media (min-width: 768px) {
		display: flex;
		flex-wrap: nowrap;
		margin-top: auto;

		& > :first-child {
			margin-right: auto;
		}

		& > * {
			margin-bottom: 0;
		}
	}
`

export const PaymentWrapper = styled.div`
	padding: 15px 30px;
	display: flex;
	flex-direction: column;
	align-items: center;

	& > h2:first-child {
		align-self: flex-start;
		margin-bottom: 50px;
	}

	@media (min-width: 768px) {
		padding: 20px 30px;
		width: 50%;
	}

	@media (min-width: 1200px) {
		padding: 30px 75px 85px;

		& > :last-child {
			margin-top: auto;
		}
	}
`
