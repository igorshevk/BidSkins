import styled from 'styled-components'

export const QuestionsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 10px;
	margin-top: 40px;
	margin-bottom: 40px;
	height: 100%;

	@media (min-width: 768px) {
		padding: 0 75px;
		margin-bottom: 20px;
	}

	@media (min-width: 992px) {
		padding: 0 125px;
		margin-bottom: 20px;
	}

	@media (min-width: 1600px) {
		padding: 0 300px;
		margin-bottom: 20px;
	}
`
