import pMap from 'p-map'
import { backgroundImageOptions } from './background-images'
import { isServer } from './config'

const banner = `

████████╗██████╗  █████╗ ███╗   ██╗███████╗██╗████████╗██╗██╗   ██╗███████╗    ██████╗ ███████╗
╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██║╚══██╔══╝██║██║   ██║██╔════╝    ██╔══██╗██╔════╝
   ██║   ██████╔╝███████║██╔██╗ ██║███████╗██║   ██║   ██║██║   ██║█████╗      ██████╔╝███████╗
   ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║██║   ██║   ██║╚██╗ ██╔╝██╔══╝      ██╔══██╗╚════██║
   ██║   ██║  ██║██║  ██║██║ ╚████║███████║██║   ██║   ██║ ╚████╔╝ ███████╗    ██████╔╝███████║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝   ╚═╝   ╚═╝  ╚═══╝  ╚══════╝    ╚═════╝ ╚══════╝
                                                                                               
   This webapp was built by https://transitivebullsh.it
`

export async function bootstrap() {
  if (isServer) return

  console.log(banner)
  preloadBackgroundImages()
}

export function preloadBackgroundImages() {
  const requestIdleCallback =
    window.requestIdleCallback ||
    function requestIdleCallbackPolyfill(cb: Function) {
      const start = Date.now()
      return setTimeout(() => {
        cb({
          didTimeout: false,
          timeRemaining: () => {
            return Math.max(0, 50 - (Date.now() - start))
          }
        })
      }, 1)
    }

  function loadImageOnIdle(src: string): Promise<void> {
    return new Promise((resolve) => {
      requestIdleCallback(() => {
        const img = document.createElement('img')
        img.onload = () => resolve()
        img.onerror = () => resolve()
        img.src = src
      })
    })
  }

  setTimeout(async () => {
    await pMap(
      backgroundImageOptions,
      (option) => loadImageOnIdle(option.src),
      {
        concurrency: 4
      }
    )
  }, 1000)
}
