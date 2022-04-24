import * as React from 'react'
import Head from 'next/head'

export const GoogleFont: React.FC<{
  fontFamily?: string
}> = ({ fontFamily }) => {
  if (!fontFamily) {
    return null
  }

  // https://developers.google.com/fonts/docs/css2
  const fontFamilies = [fontFamily]
  const googleFontFamilies = fontFamilies
    .map((font) => font.replace(/ /g, '+'))
    .map((font) => `family=${font}`)
    .join('&')
  const googleFontsLink = `https://fonts.googleapis.com/css?${googleFontFamilies}&display=swap`
  // const cssFontFamilies = fontFamilies.map((font) => `"${font}"`).join(', ')

  return (
    <Head>
      <link rel='stylesheet' href={googleFontsLink} crossOrigin='anonymous' />
    </Head>
  )
}
