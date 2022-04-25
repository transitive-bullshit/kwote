import create from 'zustand'
import { persist } from 'zustand/middleware'

import { KwoteEditorConfig } from './types'

interface EditorStore {
  config: KwoteEditorConfig
  editorRef: HTMLElement | null
  currentWidth: number
  currentHeight: number
  updateConfig: (update: Partial<KwoteEditorConfig>) => void
  setEditorRef: (editorRef: HTMLElement | null) => void
  setCurrentSize: (width: number, height: number) => void
}

const defaultConfig: KwoteEditorConfig = {
  background: '/images/00.jpg',
  fontFamily: 'Inter',
  fontSize: 16,
  padding: 32,
  aspectRatio: 'auto',
  width: 'auto'
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      editorRef: null,
      currentWidth: 0,
      currentHeight: 0,
      updateConfig: (update) =>
        set((state) => ({ config: { ...state.config, ...update } })),
      setEditorRef: (editorRef: HTMLElement | null) =>
        set(() => ({ editorRef })),
      setCurrentSize: (width: number, height: number) =>
        set(() => ({ currentWidth: width, currentHeight: height })),
      reset: () => set(() => ({ config: defaultConfig }))
    }),
    {
      name: 'kwote-config',
      getStorage: () => localStorage,
      partialize: (state) => ({ config: state.config })
    }
  )
)
