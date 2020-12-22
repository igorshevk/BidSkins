import styled from 'styled-components'
import {
	alignSelf,
	AlignSelfProps,
	border,
	BorderProps,
	borderRadius,
	BorderRadiusProps,
	color,
	ColorProps,
	fontFamily,
	FontFamilyProps,
	fontSize,
	FontSizeProps,
	fontWeight,
	FontWeightProps,
	height,
	HeightProps,
	justifySelf,
	JustifySelfProps,
	lineHeight,
	margin,
	MarginProps,
	maxWidth,
	MaxWidthProps,
	padding,
	PaddingProps,
	width,
	WidthProps,
} from 'styled-system'

export interface ButtonProps
	extends BorderProps,
		ColorProps,
		FontFamilyProps,
		FontSizeProps,
		FontWeightProps,
		PaddingProps,
		BorderRadiusProps,
		WidthProps,
		MaxWidthProps,
		HeightProps,
		MarginProps,
		AlignSelfProps,
		JustifySelfProps {
	textDecoration?: string
}

export const Button = styled.button<ButtonProps>`
	${color};
	${fontFamily};
	${fontSize};
	${fontWeight};
	${lineHeight};
	${padding};
	${margin};
	${alignSelf};
	${justifySelf};
	${border};

	text-decoration: ${({ textDecoration }) => textDecoration};

	height: max-content;
	${width};
	${maxWidth};
	${height};

	${borderRadius};

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	display: flex;
	justify-content: center;
	align-items: center;
`

Button.defaultProps = {
	color: 'white',
	backgroundColor: 'dark',
	fontFamily: 'body',
	fontSize: '1rem',
}
