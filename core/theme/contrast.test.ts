import { describe, expect, it } from 'vitest'
import { contrastRatio, relativeLuminance } from './contrast'

const MAX_RATIO = 21
const REFERENCE_GRAY_RATIO = 4.54
const REFERENCE_PRECISION = 2

describe('relativeLuminance', () => {
  it('returns 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBe(0)
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1)
  })

  it('rejects colors that are not #rrggbb', () => {
    expect(() => relativeLuminance('red')).toThrow()
    expect(() => relativeLuminance('#fff')).toThrow()
  })
})

describe('contrastRatio', () => {
  it('is 21:1 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(MAX_RATIO)
  })

  it('is 1:1 for identical colors', () => {
    expect(contrastRatio('#777777', '#777777')).toBe(1)
  })

  it('does not depend on the order of the colors', () => {
    expect(contrastRatio('#336699', '#ffffff')).toBe(contrastRatio('#ffffff', '#336699'))
  })

  it('matches a known reference value', () => {
    // #767676 on white is the classic "just passes AA" gray (4.54:1)
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(REFERENCE_GRAY_RATIO, REFERENCE_PRECISION)
  })
})
