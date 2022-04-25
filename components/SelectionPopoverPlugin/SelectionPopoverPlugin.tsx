import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect
} from 'react'
import { createPortal } from 'react-dom'
import {
  BLUR_COMMAND,
  ElementNode,
  LexicalEditor,
  RangeSelection
} from 'lexical'
import cs from 'clsx'

import { $isCodeHighlightNode } from '@lexical/code'
import { $isLinkNode } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isAtNodeEnd } from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  TextNode
} from 'lexical'

import styles from './styles.module.css'

function setPopoverPosition(popoverEl: HTMLElement, rect: DOMRect) {
  if (!rect) {
    popoverEl.style.opacity = '0'
    popoverEl.style.top = '-1000px'
    popoverEl.style.left = '-1000px'
  } else {
    popoverEl.style.opacity = '1'
    popoverEl.style.top = `${
      rect.top - popoverEl.offsetHeight - 8 + window.pageYOffset
    }px`
    popoverEl.style.left = `${
      rect.left +
      window.pageXOffset +
      rect.width / 2 -
      popoverEl.offsetWidth / 2
    }px`
    // console.log({
    //   left: rect.left,
    //   top: rect.top,
    //   width: rect.width,
    //   height: rect.height,
    //   offsetWidth: popoverEl.offsetWidth
    // })
  }
}

function FloatingSelectionPopover({
  editor,
  isBold,
  isItalic
}: {
  editor: LexicalEditor
  isBold: boolean
  isCode: boolean
  isItalic: boolean
  isLink: boolean
  isStrikethrough: boolean
  isUnderline: boolean
}): React.ReactElement {
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const mouseDownRef = useRef(false)

  const updatePopover = useCallback(() => {
    const selection = $getSelection()

    const popoverEl = popoverRef.current
    const nativeSelection = window.getSelection()

    if (!popoverEl || !nativeSelection) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0)
      let rect

      if (nativeSelection.anchorNode === rootElement) {
        let inner: Element = rootElement
        while (inner.firstElementChild) {
          inner = inner.firstElementChild
        }

        rect = inner.getBoundingClientRect()
      } else {
        rect = domRange.getBoundingClientRect()
      }

      if (!mouseDownRef.current) {
        setPopoverPosition(popoverEl, rect)
      }
    }
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updatePopover()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updatePopover()
          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor, updatePopover])

  const [isFirstRender, setIsFirstRender] = useState(true)
  useLayoutEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      const editorState = editor.getEditorState()
      editorState.read(() => {
        updatePopover()
      })
    }
  }, [isFirstRender, editor, updatePopover])

  return (
    <div ref={popoverRef} className={styles['selection-popover']}>
      <button
        onClick={(event) => {
          event.preventDefault()

          if (isItalic) {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          }

          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          return false
        }}
        className={cs(styles.item, styles.bold, isBold && styles.active)}
        aria-label='Highlight text as bold'
      />

      <button
        onClick={(event) => {
          event.preventDefault()

          if (isBold) {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          }

          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          return false
        }}
        className={cs(styles.item, styles.italic, isItalic && styles.active)}
        aria-label='Highlight text as italic'
      />
    </div>
  )
}

function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()

  if (anchorNode === focusNode) {
    return anchorNode
  }

  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  }
}

function useSelectionPopover(editor: LexicalEditor): React.ReactElement | null {
  const [isText, setIsText] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isCode, setIsCode] = useState(false)

  const updateSelectionState = React.useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) {
      return
    }

    const node = getSelectedNode(selection)

    // Update text format
    setIsBold(selection.hasFormat('bold'))
    setIsItalic(selection.hasFormat('italic'))
    setIsUnderline(selection.hasFormat('underline'))
    setIsStrikethrough(selection.hasFormat('strikethrough'))
    setIsCode(selection.hasFormat('code'))

    // Update links
    const parent = node.getParent()
    if ($isLinkNode(parent) || $isLinkNode(node)) {
      setIsLink(true)
    } else {
      setIsLink(false)
    }

    if (
      !$isCodeHighlightNode(selection.anchor.getNode()) &&
      selection.getTextContent() !== ''
    ) {
      setIsText($isTextNode(node))
    } else {
      setIsText(false)
    }
  }, [])

  useEffect(() => {
    return editor.registerCommand(
      BLUR_COMMAND,
      (event: React.FocusEvent) => {
        updateSelectionState()

        // TODO: test this on non-chrome browsers
        if (!event.relatedTarget) {
          setIsText(false)
          setIsLink(false)
        }

        return false
      },
      COMMAND_PRIORITY_LOW
    )
  }, [editor, updateSelectionState])

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateSelectionState()
      })
    })
  }, [editor, updateSelectionState])

  if (!isText || isLink) {
    return null
  }

  return createPortal(
    <FloatingSelectionPopover
      editor={editor}
      isLink={isLink}
      isBold={isBold}
      isItalic={isItalic}
      isStrikethrough={isStrikethrough}
      isUnderline={isUnderline}
      isCode={isCode}
    />,
    document.body
  )
}

export function SelectionPopoverPlugin(): React.ReactElement | null {
  const [editor] = useLexicalComposerContext()
  return useSelectionPopover(editor)
}
