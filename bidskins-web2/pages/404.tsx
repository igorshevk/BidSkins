import ErrorPage from 'next/error'

export default function Custom404() {
	return <ErrorPage statusCode={404} title="Page Not Found" />
}
