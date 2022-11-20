import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { library } from '@fortawesome/fontawesome-svg-core'
import {  faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

library.add( faMoon, faSun)


export default function App({ Component, pageProps }: AppProps) {
  return ( 
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
  )
}
