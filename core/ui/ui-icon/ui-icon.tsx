import React from 'react'
import { useTheme } from '@/core/theme'
import { 
  ICON_REGISTRY, 
  type UIIconProps, 
  type UIIconSize, 
  type UIIconColor,
} from './types'

export function UIIconComponent({ 
  name, 
  size = 'md', 
  color = 'text', 
  weight = 'light',
}: UIIconProps) {
  const { spacing, colors } = useTheme()
  const IconComponent = ICON_REGISTRY[name]

  if (!IconComponent) return null

  const sizes: Record<UIIconSize, number> = {
    xs: spacing.sm,
    sm: spacing.md,
    md: spacing.lg,
    lg: spacing.xl,
    xl: spacing.xxl,
  }

  const iconColors: Record<UIIconColor, string> = {
    text: colors.text,
    tint: colors.tint,
    muted: colors.iconDefault,
    background: colors.background,
  }

  return (
    <IconComponent 
      size={sizes[size]} 
      color={iconColors[color]} 
      weight={weight} 
    />
  )
}