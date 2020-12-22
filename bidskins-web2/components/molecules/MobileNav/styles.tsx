import styled from 'styled-components'

interface OpenProp {
	open: boolean
}

export const Wrapper = styled.div<OpenProp>`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;

	z-index: 99;

	background: ${({ open }) => (open ? 'rgba(0, 0, 0, 0.3)' : 'transparent')};
	pointer-events: ${({ open }) => (open ? 'auto' : 'none')};

	@media (min-width: 1200px) {
		display: none;
	}
`

export const NavWrapper = styled.div<OpenProp>`
	position: fixed;
	top: 0;
	left: ${({ open }) => (open ? 0 : -260)}px;
	height: 100%;
	width: 260px;

	background-color: #1c1c20;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;
	z-index: 3;

	text-align: center;
	transition: 0.3s;

	& > :not(:first-child) {
		margin: 5px 0;
	}
`
