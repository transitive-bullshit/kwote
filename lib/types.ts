export type Width = 'auto' | number
export type AspectRatio = 'auto' | number

export interface KwoteEditorConfig {
  background: string
  fontFamily: string
  fontSize: number
  padding: number
  aspectRatio: AspectRatio
  width: Width
}
