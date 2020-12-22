import styled from 'styled-components'

interface WrapperProps {
	selected: boolean
}

export const Wrapper = styled.div<WrapperProps>`
	height: 100%;
	width: 100%;
	background: ${({ selected }) => (selected ? 'rgba(250, 81, 64, 22%)' : '#1e1e24')};
	border: 1px solid #fa5140;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	background-size: 100% 100%;
`

export const ImageWrapper = styled.div`
	height: 75%;
	width: 100%;
	background: url('/img/item-background.png');
	padding-top: 7px;
	padding-bottom: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const SelectedWrapper = styled.div`
	height: 25%;
	width: 100%;
	display: flex;
	justify-content: center;
	padding-top: 7px;
	padding-bottom: 5px;
	position: relative;

	& > p:first-child {
		position: absolute;
		top: -6px;
	}
`
