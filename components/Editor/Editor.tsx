import * as React from 'react'
import cs from 'clsx'
// import type { EditorState } from 'lexical'
import LexicalComposer from '@lexical/react/LexicalComposer'
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import ContentEditable from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { useEditorStore } from '~/lib/editor-store'

import styles from './styles.module.css'
import { GoogleFont } from '../GoogleFont/GoogleFont'

const lexicalEditorConfig = {
  onError(err: Error) {
    throw err
  }
}

/*
The great scientists, when an opportunity opens up, get after it and they pursue it. They drop all other things. They get rid of other things and they get after an idea because they had already thought the thing through. Their minds are prepared; they see the opportunity and they go after it. Now of course lots of times it doesn't work out, but you don't have to hit many of them to do some great science. It's kind of easy. One of the chief tricks is to live a long time!

Another trait, it took me a while to notice. I noticed the following facts about people who work with the door open or the door closed. I notice that if you have the door to your office closed, you get more work done today and tomorrow, and you are more productive than most. But 10 years later somehow you don't know quite know what problems are worth working on; all the hard work you do is sort of tangential in importance. He who works with the door open gets all kinds of interruptions, but he also occasionally gets clues as to what the world is and what might be important. Now I cannot prove the cause and effect sequence because you might say, “The closed door is symbolic of a closed mind.” I don't know. But I can say there is a pretty good correlation between those who work with the doors open and those who ultimately do important things, although people who work with doors closed often work harder. Somehow they seem to work on slightly the wrong thing - not much, but enough that they miss fame.
*/

function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext()

  React.useEffect(() => {
    editor.focus()
  }, [editor])

  return null
}

export const Editor: React.FC<{ className?: string }> = ({ className }) => {
  const kwoteEditorConfig = useEditorStore((state) => state.config)

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

  const containerStyle = React.useMemo<React.CSSProperties>(
    () => ({
      backgroundImage: `url('${kwoteEditorConfig.background}')`,
      fontFamily: `"${kwoteEditorConfig.fontFamily}", ui-sans-serif, system-ui, sans-serif`,
      fontSize: `${kwoteEditorConfig.fontSize}px`,
      padding: `${kwoteEditorConfig.padding}px`
    }),
    [kwoteEditorConfig]
  )

  return (
    <>
      <GoogleFont fontFamily={kwoteEditorConfig.fontFamily} />

      <div className={cs(styles.container, className)} style={containerStyle}>
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
    </>
  )
}

const Placeholder: React.FC = () => {
  return <div className={styles.placeholder}>Enter some text...</div>
}
