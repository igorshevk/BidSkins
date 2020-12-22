import styled from 'styled-components'
import { margin, MarginProps } from 'styled-system'

export interface DividerProps extends MarginProps {}

export const Divider = styled.hr<DividerProps>`
	border: 0;
	border-bottom: 1px solid #3e3e3e;
	${margin};
	height: 1px;
`

Divider.defaultProps = {
	marginTop: '8px',
	marginBottom: '8px',
}

export const VerticalDivider = styled.hr`
	width: 1px;
	height: 32px;
	border: 1px solid #393949;
	margin: 0 20px;
`
