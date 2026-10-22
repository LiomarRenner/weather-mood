import { describe, expect, it } from 'vitest'
import { DefaultLightTheme } from '@/core/theme/tokens'
import { resolveSpacingStyle } from './spacing-style'

const { spacing } = DefaultLightTheme

describe('resolveSpacingStyle', () => {
  it('returns an empty style when no spacing prop is set', () => {
    expect(resolveSpacingStyle(spacing, {})).toEqual({})
  })

  it('maps shorthand props to React Native style keys', () => {
    expect(resolveSpacingStyle(spacing, { paddingX: 'md', marginY: 'xs', gap: 'sm' })).toEqual({
      paddingHorizontal: spacing.md,
      marginVertical: spacing.xs,
      gap: spacing.sm,
    })
  })

  it('skips props explicitly set to undefined', () => {
    expect(resolveSpacingStyle(spacing, { padding: undefined, margin: 'lg' })).toEqual({
      margin: spacing.lg,
    })
  })
})
