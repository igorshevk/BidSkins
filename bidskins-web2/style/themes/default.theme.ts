import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
	breakpoints: ['576px', '768px', '992px', '1200px', '1920px'],
	fonts: {
		body: 'Helvetica, Arial, sans-serif',
		heading: 'Porter Bold, sans-serif',
	},
	colors: {
		'gray-lightest': '#5F5E78',
		'gray-lighter': '#4e4e63',
		'gray-light': '#6e6e76',
		gray: '#1a1a1f',
		'gray-dark': '#232329',
		'gray-darker': '#1C1C20',
		primary: '#fb4839',
		success: '#5cff54',
		'blue-light': '#597cc2',
		'blue-dark': '#414157',
		'blue-darker': '#323243',
	},
}

export default theme
