import { describe, expect, it } from 'vitest'
import { DefaultLightTheme } from '@/core/theme/tokens'
import { resolveTextStyle } from './text-style'

const { typography } = DefaultLightTheme

describe('resolveTextStyle', () => {
  it('uses the variant default weight', () => {
    expect(resolveTextStyle(typography, 'display')).toEqual({
      fontSize: typography.size.display,
      fontFamily: typography.family.black,
      letterSpacing: typography.kerning.tight,
    })
  })

  it('lets an explicit weight override the default family', () => {
    const style = resolveTextStyle(typography, 'caption', 'medium')

    expect(style.fontSize).toBe(typography.size.caption)
    expect(style.fontFamily).toBe(typography.family.medium)
  })

  it('derives kerning from the resolved weight, not the variant', () => {
    expect(resolveTextStyle(typography, 'body').letterSpacing).toBe(typography.kerning.open)
    expect(resolveTextStyle(typography, 'body', 'extraBold').letterSpacing).toBe(typography.kerning.tight)
    expect(resolveTextStyle(typography, 'display', 'bold').letterSpacing).toBe(typography.kerning.standard)
  })
})
