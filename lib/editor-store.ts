import create from 'zustand'

import { KwoteEditorConfig } from './types'

interface EditorStore {
  config: KwoteEditorConfig
  container: HTMLElement | null
  updateConfig: (update: Partial<KwoteEditorConfig>) => void
  setContainer: (container: HTMLElement | null) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  config: {
    background: '/images/00.jpg',
    fontFamily: 'Inter',
    fontSize: 16,
    padding: 32,
    width: 'auto'
  },
  container: null,
  updateConfig: (update) =>
    set((state) => ({ config: { ...state.config, ...update } })),
  setContainer: (container: HTMLElement | null) => set(() => ({ container }))
}))
