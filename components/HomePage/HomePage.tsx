import * as React from 'react'
import { Toaster, DefaultToastOptions } from 'react-hot-toast'

import { githubRepoUrl } from '~/lib/config'
import { Editor } from '~/components/Editor/Editor'
import { ControlPanel } from '~/components/ControlPanel/ControlPanel'
import { GitHubShareButton } from '~/components/GitHubShareButton/GitHubShareButton'
import { Footer } from '~/components/Footer/Footer'

import styles from './styles.module.css'
import { PageHead } from '../PageHead/PageHead'

const toastOptions: DefaultToastOptions = {
  success: {
    duration: 3000
  },
  error: {
    duration: 6000
  }
}

export const HomePage: React.FC = () => {
  return (
    <>
      <PageHead />

      <div className={styles.container}>
        <GitHubShareButton repoUrl={githubRepoUrl} />

        <main className={styles.main}>
          <Editor className={styles.editor} />
        </main>

        <ControlPanel className={styles.controlPanel} />

        <Toaster position='top-right' toastOptions={toastOptions} />

        <Footer />
      </div>
    </>
  )
}
