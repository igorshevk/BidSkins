import styled from 'styled-components'

interface DisabledProp {
	disabled: boolean
}

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	font-weight: bold;
	color: white;
	margin: 0 auto;
	align-items: center;
	max-width: 300px;

	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'auto')};

	& > button {
		cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	}
`

export const AuctionBidCountWrapper = styled.div<DisabledProp>`
	background-color: #383849;
	height: 45px;
	width: 25%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 5px solid #2d2d3a;
	cursor: auto;

	/* We are only applying this to the bid count wrapper since the button already has it */
	opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`
