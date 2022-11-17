import '../styles/globals.css'

import { SWRConfig } from 'swr'
import { Auth0Provider } from '@auth0/auth0-react'
import { ThemeProvider } from 'next-themes'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
        redirectUri={process.browser && window.location.origin}
      >
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json())
          }}
        >
          <Header />
          <Component {...pageProps} />
        </SWRConfig>
      </Auth0Provider>
    </ThemeProvider>

  )
}

export default MyApp
