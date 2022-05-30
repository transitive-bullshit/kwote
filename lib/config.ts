export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'
export const isServer = typeof window === 'undefined'
export const isSafari =
  !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const title = 'Kwote'
export const description =
  'Kwote is a simple, free webapp for creating beautiful quotes that capture your attention.'
export const author = 'Travis Fischer'
export const twitter = 'transitive_bs'
export const domain = 'kwote.app'
export const githubRepoUrl = 'https://github.com/transitive-bullshit/kwote'
export const copyright = `Copyright 2022 ${author}`

export const port = process.env.PORT || '3000'
export const host = isDev ? `http://localhost:${port}` : `https://${domain}`

// analytics
export const fathomId = isDev ? null : process.env.NEXT_PUBLIC_FATHOM_ID
export const fathomConfig = fathomId
  ? {
      excludedDomains: ['localhost', 'localhost:3000']
    }
  : undefined

export const image: string | null = `${host}/social.jpg`
export const MIN_FRAME_WIDTH = 360
export const MAX_FRAME_WIDTH = 1200
