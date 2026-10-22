import { type TextProps } from 'react-native'
import { type UITextVariant, type UITextWeight } from './text-style'

export type UITextColor = 'text' | 'textMuted' | 'tint'

export type UITextProps = TextProps & {
  readonly variant?: UITextVariant
  readonly weight?: UITextWeight
  readonly color?: UITextColor
}

export { type UITextVariant, type UITextWeight }
