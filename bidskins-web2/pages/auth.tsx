import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { ClipLoader } from 'react-spinners'
import { Heading, Link } from '../components/atoms'
import Head from '../components/Head'
import { Wrapper } from './_styles/auth'
import { useAuthContext } from '../context'
import { ApiService, CookieService } from '../services'

const Auth = ({ query: { token } }) => {
	const router = useRouter()
	const { setUser } = useAuthContext()

	useEffect(() => {
		if (token) {
			setTimeout(async () => {
				try {
					CookieService.setAccessToken(token)
					const userProfile = await ApiService.getUserProfile()
					setUser(userProfile)
				} catch (e) {
					console.log(e)
				}
				router.push('/')
			}, 500)
		}
	}, [token])

	return (
		<Fragment>
			<Head title={'Auth'} />
			<Wrapper>
				<Heading.H3 color={'primary'}>Authenticating</Heading.H3>
				<ClipLoader size={55} color={'#64626F'} />
				<NextLink href={'/'} passHref>
					<Link color={'blue-light'}>Click here if you are not redirected</Link>
				</NextLink>
			</Wrapper>
		</Fragment>
	)
}

Auth.getInitialProps = ({ query }) => {
	return { query }
}

export default Auth
