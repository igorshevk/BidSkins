import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	@font-face {
		font-family: 'Porter Bold';
		src: url('/fonts/Porter_Bold.woff') format('eot'), url('/fonts/Porter_Bold.woff') format('woff'), url('/fonts/Porter_Bold.ttf') format('truetype'), url('/fonts//Porter_Bold.svg') format('svg');
		font-weight: normal;
		font-style: normal;
	}

	html, body, body > div {
		height: 100%;
		background: #1e1e23;
	}

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		overflow-x: hidden;
	}

	a, input, button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		outline: inherit;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}

	a, button {
		cursor: pointer;
	}
	
	input {
		cursor: text;
	}

	.react-toast-notifications__container {
		background-color: transparent;
	}

	.fa, .fas {
		font-weight: 900;
	}

	.fa, .far, .fas {
		font-family: "Font Awesome 5 Free";
	}

	.fa, .fab, .fal, .far, .fas {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		display: inline-block;
		font-style: normal;
		font-variant: normal;
		text-rendering: auto;
		line-height: 1;
	}

	.fa-home::before {
		content: "\f015";
	}
`
