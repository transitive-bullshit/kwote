import * as React from 'react'

import { Editor } from 'components/Editor/Editor'

import styles from './styles.module.css'

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Editor />
    </div>
  )
}
