import create from 'zustand'

import { KwoteEditorConfig } from './types'

interface EditorStore {
  config: KwoteEditorConfig
  updateConfig: (update: Partial<KwoteEditorConfig>) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  config: {
    background: '/images/00.jpg',
    fontFamily: 'Inter',
    fontSize: 16,
    padding: 32,
    width: 'auto'
  },
  updateConfig: (update) =>
    set((state) => ({ ...state, config: { ...state.config, ...update } }))
}))
