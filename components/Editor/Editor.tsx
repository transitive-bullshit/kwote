import * as React from 'react'
import cs from 'clsx'
import shallow from 'zustand/shallow'
import { useLocalStorage } from 'react-use'
import useSize from '@react-hook/size'

import type { EditorState } from 'lexical'
import LexicalComposer from '@lexical/react/LexicalComposer'
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import ContentEditable from '@lexical/react/LexicalContentEditable'
import OnChangePlugin from '@lexical/react/LexicalOnChangePlugin'
import AutoFocusPlugin from '@lexical/react/LexicalAutoFocusPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { SelectionPopoverPlugin } from '~/components/SelectionPopoverPlugin/SelectionPopoverPlugin'
import { GoogleFont } from '~/components/GoogleFont/GoogleFont'
import { useEditorStore } from '~/lib/editor-store'
import { MIN_FRAME_WIDTH, MAX_FRAME_WIDTH } from '~/lib/config'
import initialEditorStateTutorial from './tutorial'

import styles from './styles.module.css'

const lexicalEditorConfig = {
  onError(err: Error) {
    console.error('lexical error', err)
    throw err
  }
}

function RestoreFromLocalStoragePlugin() {
  const [editor] = useLexicalComposerContext()
  const [serializedEditorState, setSerializedEditorState] = useLocalStorage<
    string | null
  >('kwote-editor-state', null)
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      if (serializedEditorState) {
        try {
          // restore editor state but ignore the selection
          const tempEditorState = JSON.parse(serializedEditorState)
          tempEditorState._selection = editor
            .getEditorState()
            .clone()._selection
          const dummySerializedEditorState = JSON.stringify(tempEditorState)

          const initialEditorState = editor.parseEditorState(
            dummySerializedEditorState
          )
          editor.setEditorState(initialEditorState)
        } catch (err) {
          // ignore invalid initial state
          console.warn('error restoring editor state from local storage', err)
        }
      } else {
        const initialEditorState = editor.parseEditorState(
          initialEditorStateTutorial
        )
        editor.setEditorState(initialEditorState)
      }
    }
  }, [isFirstRender, serializedEditorState, editor])

  const onChange = React.useCallback(
    (editorState: EditorState) => {
      const clone = editorState.clone()
      const editorStateJSON: any = clone.toJSON()
      // console.log(JSON.stringify(editorStateJSON))
      delete editorStateJSON._selection
      setSerializedEditorState(JSON.stringify(editorStateJSON))
    },
    [setSerializedEditorState]
  )

  // TODO: add ignoreSelectionChange
  return <OnChangePlugin onChange={onChange} />
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

  const editorStyle = React.useMemo<React.CSSProperties>(() => {
    const { background, fontFamily, fontSize, padding, width, aspectRatio } =
      kwoteEditorConfig

    const props: React.CSSProperties = {
      fontFamily: `"${fontFamily}", ui-sans-serif, system-ui, sans-serif`,
      fontSize: `${fontSize}px`,
      padding: `${padding}px`
    }

    if (background) {
      props.backgroundImage = `url('${background}')`
    }

    if (width !== 'auto') {
      props.width = `${width}px`
    }

    if (aspectRatio !== 'auto') {
      props.aspectRatio = `${aspectRatio} / 1`
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

  React.useEffect(() => {
    setKwoteCurrentSize(width, height)
  }, [setKwoteCurrentSize, width, height])

  const onClickAutoWidth = React.useCallback(() => {
    updateKwoteEditorConfig({ width: 'auto' })
  }, [updateKwoteEditorConfig])

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
                  placeholder={<Placeholder />}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <RestoreFromLocalStoragePlugin />
                <SelectionPopoverPlugin />
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
  return <div className={styles.placeholder}>Enter your quote...</div>
}
