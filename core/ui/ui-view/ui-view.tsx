import { useMemo, type ReactNode } from 'react'
import { View } from 'react-native'
import { useTheme } from '@/core/theme'
import { resolveSpacingStyle } from './spacing-style'
import { type UIViewProps } from './types'

// Accessibility stays neutral by default so screen readers can reach nested controls.
// Opt in with accessible + accessibilityRole only when the block should be read as one element.
export function UIViewComponent({
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  gap,
  style,
  ...props
}: UIViewProps): ReactNode {
  const { spacing } = useTheme()

  const spacingStyle = useMemo(function () {
    return resolveSpacingStyle(spacing, { padding, paddingX, paddingY, margin, marginX, marginY, gap })
  }, [spacing, padding, paddingX, paddingY, margin, marginX, marginY, gap])

  return <View {...props} style={[spacingStyle, style]} />
}
