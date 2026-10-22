export type PressableAccessibilityState = {
  readonly disabled?: boolean | undefined
  readonly busy?: boolean | undefined
  readonly selected?: boolean | undefined
  readonly checked?: boolean | 'mixed' | undefined
  readonly expanded?: boolean | undefined
}

// A busy control is also disabled, so it cannot be triggered twice
export function resolveAccessibilityState(
  disabled: boolean,
  busy: boolean,
  state?: PressableAccessibilityState | null,
): PressableAccessibilityState {
  return { ...state, disabled: disabled || busy, busy }
}
