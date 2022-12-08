import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { CssBaseline, NextUIProvider, createTheme } from '@nextui-org/react'
// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$yellow200',
      primaryLightHover: '$yellow300',
      primaryLightActive: '$yellow400',
      primaryLightContrast: '$yellow600',
      primary: '#FDA504',
      primaryBorder: '$yellow500',
      primaryBorderHover: '$yellow600',
      primarySolidHover: '$yellow700',
      primarySolidContrast: '$white',
      primaryShadow: '$yellow500',
      secondaryColor: '$yellow500',

      gradient: 'linear-gradient(112deg, $yellow100 -25%, $pink500 -10%, $gold500 80%)',
      link: '#FDA504',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
            {/* {CssBaseline.flush()} */}
  <Component {...pageProps} />
  </NextUIProvider>
  )
}
