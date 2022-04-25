import * as React from 'react'
import cs from 'clsx'
import shallow from 'zustand/shallow'

// import type { EditorState } from 'lexical'
import LexicalComposer from '@lexical/react/LexicalComposer'
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import ContentEditable from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import useSize from '@react-hook/size'

import { useEditorStore } from '~/lib/editor-store'
import { MIN_FRAME_WIDTH, MAX_FRAME_WIDTH } from '~/lib/config'

import styles from './styles.module.css'
import { GoogleFont } from '../GoogleFont/GoogleFont'

const lexicalEditorConfig = {
  onError(err: Error) {
    console.error('lexical error', err)
    throw err
  }
}

function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    editor.focus()
  }, [editor])

  return null
}

export const Editor: React.FC<{ className?: string }> = ({ className }) => {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const kwoteEditorConfig = useEditorStore((store) => store.config, shallow)
  const setKwoteEditorRef = useEditorStore((store) => store.setEditorRef)
  const setKwoteCurrentSize = useEditorStore((store) => store.setCurrentSize)
  const updateKwoteEditorConfig = useEditorStore((store) => store.updateConfig)

  const [width, height] = useSize(editorRef)
  const activeResizeHandle = React.useRef<'left' | 'right' | null>(null)
  const resizeStartX = React.useRef<number>(0)
  const resizeStartWidth = React.useRef<number>(0)

  React.useEffect(() => {
    setKwoteCurrentSize(width, height)
  }, [setKwoteCurrentSize, width, height])

  // const [serializedInitialEditorState, setSerializedInitialEditorState] =
  //   useLocalStorage<string | null>('kwote-editor-state', null)
  // const initialEditorState = React.useRef<EditorState>()
  // const [isFirstRender, setIsFirstRender] = React.useState(true)

  // React.useEffect(() => {
  //   if (isFirstRender) {
  //     setIsFirstRender(false)

  //     if (serializedInitialEditorState) {
  //       initialEditorState.current = JSON.parse(serializedInitialEditorState)
  //       console.log('initial editor', {
  //         serializedInitialEditorState: serializedInitialEditorState,
  //         initialEditorState: initialEditorState.current
  //       })
  //     }
  //   }
  // }, [isFirstRender, serializedInitialEditorState])

  // if (isFirstRender) {
  //   return null
  // }

  const editorStyle = React.useMemo<React.CSSProperties>(() => {
    const props: React.CSSProperties = {
      backgroundImage: `url('${kwoteEditorConfig.background}')`,
      fontFamily: `"${kwoteEditorConfig.fontFamily}", ui-sans-serif, system-ui, sans-serif`,
      fontSize: `${kwoteEditorConfig.fontSize}px`,
      padding: `${kwoteEditorConfig.padding}px`
    }

    if (kwoteEditorConfig.width !== 'auto') {
      props.width = `${kwoteEditorConfig.width}px`
    }

    return props
  }, [kwoteEditorConfig])

  React.useEffect(() => {
    if (editorRef.current) {
      setKwoteEditorRef(editorRef.current)
    }

    return () => {
      setKwoteEditorRef(null)
    }
  }, [editorRef, setKwoteEditorRef])

  const onMouseDownResizeHandle = React.useCallback(
    (event: React.MouseEvent, handle: 'left' | 'right') => {
      event.preventDefault()
      activeResizeHandle.current = handle
      resizeStartX.current = event.clientX
      resizeStartWidth.current = width
    },
    [width]
  )

  const onMouseDownResizeHandleLeft = React.useCallback(
    (event: React.MouseEvent) => {
      onMouseDownResizeHandle(event, 'left')
    },
    [onMouseDownResizeHandle]
  )

  const onMouseDownResizeHandleRight = React.useCallback(
    (event: React.MouseEvent) => {
      onMouseDownResizeHandle(event, 'right')
    },
    [onMouseDownResizeHandle]
  )

  React.useEffect(() => {
    function onDocumentMouseUp() {
      activeResizeHandle.current = null
    }

    function onDocumentMouseMove(event: MouseEvent) {
      if (!activeResizeHandle.current) return
      const direction = activeResizeHandle.current === 'left' ? -1 : 1
      const nextWidth =
        resizeStartWidth.current +
        2 * (event.clientX - resizeStartX.current) * direction
      const cappedWidth = Math.min(
        Math.max(nextWidth, MIN_FRAME_WIDTH),
        MAX_FRAME_WIDTH
      )

      updateKwoteEditorConfig({ width: cappedWidth })
    }

    document.addEventListener('mouseup', onDocumentMouseUp)
    document.addEventListener('mousemove', onDocumentMouseMove)
    return () => {
      document.removeEventListener('mouseup', onDocumentMouseUp)
      document.removeEventListener('mousemove', onDocumentMouseMove)
    }
  }, [updateKwoteEditorConfig])

  const onClickAutoWidth = React.useCallback(() => {
    updateKwoteEditorConfig({ width: 'auto' })
  }, [updateKwoteEditorConfig])

  return (
    <>
      <GoogleFont fontFamily={kwoteEditorConfig.fontFamily} />

      <div className={cs(styles.container, className)}>
        <div className={styles.wrapper}>
          <div className={styles.editor} style={editorStyle} ref={editorRef}>
            <LexicalComposer initialConfig={lexicalEditorConfig}>
              <div className={styles.body}>
                <RichTextPlugin
                  contentEditable={<ContentEditable className={styles.input} />}
                  // initialEditorState={initialEditorState.current}
                  placeholder={<Placeholder />}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
              </div>
            </LexicalComposer>
          </div>

          <div
            className={styles.resizeHandleLeft}
            onMouseDown={onMouseDownResizeHandleLeft}
          />

          <div
            className={styles.resizeHandleRight}
            onMouseDown={onMouseDownResizeHandleRight}
          />
        </div>

        <div className={styles.sizeInfo}>
          <span>
            {width | 0} x {height | 0}
          </span>{' '}
          {kwoteEditorConfig.width !== 'auto' && (
            <span className={styles.autoWidthButton} onClick={onClickAutoWidth}>
              (use auto width)
            </span>
          )}
        </div>
      </div>
    </>
  )
}

const Placeholder: React.FC = () => {
  return <div className={styles.placeholder}>Enter some text...</div>
}
