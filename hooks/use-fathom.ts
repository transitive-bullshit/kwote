import * as React from 'react'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'

import { fathomId, fathomConfig } from '~/lib/config'

export function useFathom() {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])
}
