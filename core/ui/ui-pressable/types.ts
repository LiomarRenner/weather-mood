import { type PressableProps } from 'react-native'

export type UIPressableProps = Omit<PressableProps, 'accessibilityLabel'> & {
  // Required: every pressable must be announced by screen readers
  readonly accessibilityLabel: string
  readonly haptics?: boolean
  readonly busy?: boolean
}
