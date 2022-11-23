import '../styles/globals.css'

import { SWRConfig } from 'swr'
import { UserProvider } from '@auth0/nextjs-auth0'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
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
      </UserProvider>
    </>
  )
}

export default MyApp
