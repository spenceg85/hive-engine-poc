import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, NextUIProvider } from '@nextui-org/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
            {/* {CssBaseline.flush()} */}
  <Component {...pageProps} />
  </NextUIProvider>
  )
}
