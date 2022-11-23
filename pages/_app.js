import '../styles/globals.css'

import { SWRConfig } from 'swr'
import { UserProvider } from '@auth0/nextjs-auth0'
import AppHeader from '../components/AppHeader'
import { rtlCache } from '../lib/rtl-cache'
import { MantineProvider } from '@mantine/core'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
        emotionCache={rtlCache}
      >
        <UserProvider>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json())
            }}
          >
            <AppHeader />
            <Component {...pageProps} />
          </SWRConfig>
        </UserProvider>
      </MantineProvider>
    </>
  )
}

export default MyApp
