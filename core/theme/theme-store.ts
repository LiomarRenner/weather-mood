import { create } from 'zustand'
import { type ThemeOverride } from './tokens'

type ThemeStoreState = {
  readonly override: ThemeOverride | null
  readonly setOverride: (override: ThemeOverride | null) => void
}

// Plain zustand store (no React Context): components subscribe through atomic selectors
export const useThemeStore = create<ThemeStoreState>()(function (set) {
  return {
    override: null,
    setOverride(override) {
      set({ override })
    },
  }
})

function selectOverride(state: ThemeStoreState): ThemeOverride | null {
  return state.override
}

export function useThemeOverride(): ThemeOverride | null {
  return useThemeStore(selectOverride)
}

// Imperative entry point for features that drive the theme (null restores the system theme)
export function setThemeOverride(override: ThemeOverride | null): void {
  useThemeStore.getState().setOverride(override)
}
