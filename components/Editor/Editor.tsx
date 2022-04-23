import * as React from 'react'
import type { EditorState } from 'lexical'
import {
  $getRoot,
  $getSelection,
  $createTextNode,
  $createParagraphNode
} from 'lexical'
import LexicalComposer from '@lexical/react/LexicalComposer'
import PlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin'
import ContentEditable from '@lexical/react/LexicalContentEditable'
import OnChangePlugin from '@lexical/react/LexicalOnChangePlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'

// import domtoImage from 'dom-to-image'

// import cs from 'clsx'

import styles from './styles.module.css'

interface KwoteEditorConfig {
  background: string
  fontFamily: string
  fontSize: string
  padding: string
  darkMode: boolean
}

const editorConfig = {
  onError(err: Error) {
    throw err
  }
}

function getInitialText() {
  const root = $getRoot()
  if (root.getFirstChild() === null) {
    {
      const p = $createParagraphNode()
      p.append(
        $createTextNode(
          `The great scientists, when an opportunity opens up, get after it and they pursue it. They drop all other things. They get rid of other things and they get after an idea because they had already thought the thing through. Their minds are prepared; they see the opportunity and they go after it. Now of course lots of times it doesn't work out, but you don't have to hit many of them to do some great science. It's kind of easy. One of the chief tricks is to live a long time!`
        )
      )
      root.append(p)
    }

    {
      const p = $createParagraphNode()
      p.append($createTextNode(''))
      root.append(p)
    }

    {
      const p = $createParagraphNode()
      p.append($createTextNode(''))
      root.append(p)
    }

    {
      const p = $createParagraphNode()
      p.append(
        $createTextNode(
          `Another trait, it took me a while to notice. I noticed the following facts about people who work with the door open or the door closed. I notice that if you have the door to your office closed, you get more work done today and tomorrow, and you are more productive than most. But 10 years later somehow you don't know quite know what problems are worth working on; all the hard work you do is sort of tangential in importance. He who works with the door open gets all kinds of interruptions, but he also occasionally gets clues as to what the world is and what might be important. Now I cannot prove the cause and effect sequence because you might say, “The closed door is symbolic of a closed mind.” I don't know. But I can say there is a pretty good correlation between those who work with the doors open and those who ultimately do important things, although people who work with doors closed often work harder. Somehow they seem to work on slightly the wrong thing - not much, but enough that they miss fame.`
        )
      )
      root.append(p)
    }
  }
}

export const Editor: React.FC = () => {
  // TODO
  // const [kwoteEditorConfig, setKwoteEditorConfig] = React.useState<KwoteEditorConfig>({
  //   background:
  // })

  const onChange = React.useCallback((editorState: EditorState) => {
    // editorState.read(() => {
    //   // Read the contents of the EditorState here.
    //   const root = $getRoot()
    //   const selection = $getSelection()
    //   console.log(root, selection)
    // })
  }, [])

  return (
    <div className={styles.container}>
      <LexicalComposer initialConfig={editorConfig}>
        <div className={styles.body}>
          <PlainTextPlugin
            contentEditable={<ContentEditable className={styles.input} />}
            placeholder={<Placeholder />}
            initialEditorState={getInitialText}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  )
}

const Placeholder: React.FC = () => {
  return <div className={styles.placeholder}>Enter some text...</div>
}
