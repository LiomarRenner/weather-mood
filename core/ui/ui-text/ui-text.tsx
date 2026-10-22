import { useMemo, type ReactNode } from 'react'
import { Text } from 'react-native'
import { useTheme } from '@/core/theme'
import { resolveTextStyle } from './text-style'
import { type UITextProps } from './types'

export function UIText({
  variant = 'body',
  weight,
  color = 'text',
  style,
  ...props
}: UITextProps): ReactNode {
  const { typography, colors } = useTheme()

  const textStyle = useMemo(function () {
    return { ...resolveTextStyle(typography, variant, weight), color: colors[color] }
  }, [typography, colors, variant, weight, color])

  return (
    <Text
      accessibilityRole="text"
      maxFontSizeMultiplier={typography.maxFontScale}
      {...props}
      style={[textStyle, style]}
    />
  )
}
