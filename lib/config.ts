export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'
export const isServer = typeof window === 'undefined'

export const fathomId = isDev ? null : process.env.NEXT_PUBLIC_FATHOM_ID
export const fathomConfig = fathomId
  ? {
      excludedDomains: ['localhost', 'localhost:3000']
    }
  : undefined

export const githubRepoUrl = 'https://github.com/transitive-bullshit/kwote'
