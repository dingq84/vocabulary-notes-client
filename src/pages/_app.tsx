import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import Layout from '../components/layout'
import { client } from '../lib/client'

import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	)
}

export default MyApp
