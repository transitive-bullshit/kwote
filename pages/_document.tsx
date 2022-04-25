import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='icon' href='/icon.svg' type='image/svg+xml' />
          <link
            rel='icon'
            href='/icon@32w.png'
            type='image/png'
            sizes='32x32'
          />

          <link rel='manifest' href='/manifest.json' />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}
