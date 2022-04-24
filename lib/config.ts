export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'
export const isServer = typeof window === 'undefined'

export const title = 'Kwote'
export const description = 'Create beautiful quotes that people will remember.'
export const twitter = 'transitive_bs'
export const domain = 'kwote.xyz'
export const image: string | null = null
export const githubRepoUrl = 'https://github.com/transitive-bullshit/kwote'

export const port = process.env.PORT || '3000'
export const host = isDev ? `http://localhost:${port}` : `https://${domain}`

// analytis
export const fathomId = isDev ? null : process.env.NEXT_PUBLIC_FATHOM_ID
export const fathomConfig = fathomId
  ? {
      excludedDomains: ['localhost', 'localhost:3000']
    }
  : undefined

export const MIN_FRAME_WIDTH = 360
export const MAX_FRAME_WIDTH = 1200
