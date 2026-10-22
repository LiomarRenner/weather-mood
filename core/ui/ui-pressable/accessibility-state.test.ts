import { describe, expect, it } from 'vitest'
import { resolveAccessibilityState } from './accessibility-state'

describe('resolveAccessibilityState', () => {
  it('reports an idle, enabled control', () => {
    expect(resolveAccessibilityState(false, false)).toEqual({ disabled: false, busy: false })
  })

  it('marks a busy control as disabled too', () => {
    expect(resolveAccessibilityState(false, true)).toEqual({ disabled: true, busy: true })
  })

  it('keeps the caller state while owning disabled and busy', () => {
    expect(resolveAccessibilityState(true, false, { selected: true, disabled: false })).toEqual({
      selected: true,
      disabled: true,
      busy: false,
    })
  })
})
