import * as React from 'react'
import { Toaster, DefaultToastOptions } from 'react-hot-toast'
import useDelayedRender from 'use-delayed-render'
import cs from 'clsx'

import { githubRepoUrl } from '~/lib/config'
import { Editor } from '~/components/Editor/Editor'
import { ControlPanel } from '~/components/ControlPanel/ControlPanel'
import { GitHubShareButton } from '~/components/GitHubShareButton/GitHubShareButton'
import { Footer } from '~/components/Footer/Footer'

import styles from './styles.module.css'
import { PageHead } from '../PageHead/PageHead'

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  success: {
    duration: 4000
  },
  error: {
    duration: 6000
  }
}

export const HomePage: React.FC = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const { mounted, rendered } = useDelayedRender(hasMounted, {
    enterDelay: 100
  })

  return (
    <>
      <PageHead />

      <div className={styles.container}>
        <GitHubShareButton repoUrl={githubRepoUrl} />

        <main className={styles.main}>
          {mounted && (
            <Editor className={cs(styles.editor, rendered && styles.visible)} />
          )}
        </main>

        {mounted && (
          <ControlPanel
            className={cs(styles.controlPanel, rendered && styles.visible)}
          />
        )}

        <Toaster position='top-right' toastOptions={toastOptions} />

        <Footer />
      </div>
    </>
  )
}
