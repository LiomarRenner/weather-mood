import { type ThemeTokens } from '@/core/theme/tokens'

type Spacing = ThemeTokens['spacing']

export type SpacingToken = keyof Spacing

// Shorthand prop -> React Native style key
const STYLE_KEY = {
  padding: 'padding',
  paddingX: 'paddingHorizontal',
  paddingY: 'paddingVertical',
  margin: 'margin',
  marginX: 'marginHorizontal',
  marginY: 'marginVertical',
  gap: 'gap',
} as const

type SpacingShorthand = keyof typeof STYLE_KEY

export type SpacingProps = {
  readonly [Key in SpacingShorthand]?: SpacingToken | undefined
}

export type SpacingStyle = Partial<Record<(typeof STYLE_KEY)[SpacingShorthand], number>>

const SPACING_SHORTHANDS = Object.keys(STYLE_KEY) as readonly SpacingShorthand[]

export function resolveSpacingStyle(spacing: Spacing, props: SpacingProps): SpacingStyle {
  const style: SpacingStyle = {}

  for (const shorthand of SPACING_SHORTHANDS) {
    const token = props[shorthand]
    if (token) style[STYLE_KEY[shorthand]] = spacing[token]
  }

  return style
}
