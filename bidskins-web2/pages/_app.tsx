import { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-toast-notifications'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyle, theme } from '../style'
import { AuthContextProvider, SocketContextProvider } from '@context'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<ToastProvider autoDismiss autoDismissTimeout={2000}>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<SocketContextProvider>
						<GlobalStyle />
						<ThemeProvider theme={theme}>{isMounted && <Component {...pageProps} />}</ThemeProvider>
					</SocketContextProvider>
				</AuthContextProvider>
			</QueryClientProvider>
		</ToastProvider>
	)
}

export default App
