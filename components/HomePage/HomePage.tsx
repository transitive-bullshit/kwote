import * as React from 'react'
import { Toaster } from 'react-hot-toast'

import { Editor } from '~/components/Editor/Editor'
import { ControlPanel } from '~/components/ControlPanel/ControlPanel'

import styles from './styles.module.css'

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Editor className={styles.editor} />
      </div>

      <ControlPanel className={styles.controlPanel} />

      <Toaster
        position='top-right'
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 6000
          }
        }}
      />
    </div>
  )
}
