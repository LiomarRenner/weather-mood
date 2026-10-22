import { describe, expect, it } from 'vitest'
import { AA_NORMAL_TEXT, contrastRatio } from '@/core/theme/contrast'
import { CONDITION_PALETTES } from './palettes'

const FOREGROUNDS = ['text', 'textMuted', 'tint', 'iconDefault'] as const
const BACKGROUNDS = ['background', 'surface'] as const

const EXPECTED_SCHEME = {
  clear: 'light',
  cloudy: 'light',
  rain: 'dark',
  snow: 'light',
  storm: 'dark',
} as const

describe('CONDITION_PALETTES', () => {
  for (const [condition, palette] of Object.entries(CONDITION_PALETTES)) {
    for (const foreground of FOREGROUNDS) {
      for (const background of BACKGROUNDS) {
        // All of these render small text (labels, captions, tab labels), so the
        // stricter normal-text threshold applies everywhere.
        it(`${condition}: ${foreground} on ${background} meets WCAG AA`, () => {
          const ratio = contrastRatio(palette.colors[foreground], palette.colors[background])
          expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT)
        })
      }
    }
  }

  it('uses the owner-defined light/dark mode per condition', () => {
    for (const [condition, scheme] of Object.entries(EXPECTED_SCHEME)) {
      expect(CONDITION_PALETTES[condition as keyof typeof EXPECTED_SCHEME].scheme).toBe(scheme)
    }
  })

  it('pairs dark schemes with light status bar content', () => {
    for (const palette of Object.values(CONDITION_PALETTES)) {
      expect(palette.colors.statusBar).toBe(palette.scheme === 'dark' ? 'light' : 'dark')
    }
  })
})
