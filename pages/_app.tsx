import 'styles/globals.css'

import * as React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { useFathom } from '~/hooks/use-fathom'
import { bootstrap } from '~/lib/bootstrap'

bootstrap()

export default function App({ Component, pageProps }: AppProps) {
  useFathom()

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
