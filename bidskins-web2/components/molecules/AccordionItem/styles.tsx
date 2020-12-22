import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 40px;
`

export const HeaderWrapper = styled.div`
	width: 100%;
	border: 1px solid #464650;
	background-color: #000000;
	background-image: linear-gradient(to left, #1f1f25 0%, #26262c 100%);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 13px 20px;
	cursor: pointer;
	z-index: 1;

	user-select: none;

	& > :nth-child(1) {
		width: 85%;
	}
`

interface ContentWrapperProps {
	opened: boolean
}

export const ContentWrapper = styled.div<ContentWrapperProps>`
	background-color: #232329;
	transition: all 0.25s ease-in-out;
	max-height: ${({ opened }) => (opened ? 1000 : 0)}px;
	border-bottom: ${({ opened }) => opened && '2px solid #f8614a'};

	padding: 20px;

	padding-top: ${({ opened }) => (opened ? 22 : 0)}px;
	padding-bottom: ${({ opened }) => (opened ? 22 : 0)}px;
`
