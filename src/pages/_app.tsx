import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useEffect } from 'react'
import { Workbox } from 'workbox-window'

import Layout from '../components/layout'
import { client } from '../lib/client'

import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (
			!('serviceWorker' in navigator) ||
			process.env.NODE_ENV !== 'production'
		) {
			console.warn('Progressive Web App support is disabled')
			return
		}
		const wb = new Workbox('sw.js', { scope: '/' })
		wb.register()
	}, [])

	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	)
}

export default MyApp
