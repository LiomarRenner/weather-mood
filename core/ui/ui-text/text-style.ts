import { type ThemeTokens } from '@/core/theme/tokens'

type Typography = ThemeTokens['typography']
type Kerning = keyof Typography['kerning']

export type UITextVariant = keyof Typography['size']
export type UITextWeight = keyof Typography['family']

export type TextStyleTokens = {
  readonly fontSize: number
  readonly fontFamily: string
  readonly letterSpacing: number
}

const DEFAULT_WEIGHT: Record<UITextVariant, UITextWeight> = {
  display: 'black',
  title: 'bold',
  label: 'medium',
  body: 'regular',
  caption: 'light',
  tiny: 'thin',
} as const

// Heavier weights need tighter tracking
const KERNING_BY_WEIGHT: Record<UITextWeight, Kerning> = {
  black: 'tight',
  extraBold: 'tight',
  bold: 'standard',
  medium: 'standard',
  regular: 'open',
  light: 'open',
  extraLight: 'open',
  thin: 'open',
} as const

export function resolveTextStyle(
  typography: Typography,
  variant: UITextVariant,
  weight?: UITextWeight,
): TextStyleTokens {
  const resolvedWeight = weight ?? DEFAULT_WEIGHT[variant]

  return {
    fontSize: typography.size[variant],
    fontFamily: typography.family[resolvedWeight],
    letterSpacing: typography.kerning[KERNING_BY_WEIGHT[resolvedWeight]],
  }
}
