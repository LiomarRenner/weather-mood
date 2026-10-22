import { setThemeOverride } from '@/core/theme'
import { resolveConditionTheme } from './commands'
import { useWeatherStore } from './state'

// Makes the last known condition drive the whole app theme. The weather store hydrates
// synchronously from MMKV, so the persisted theme applies before the first frame.
// Returns the unsubscribe function.
export function startWeatherTheme(): () => void {
  setThemeOverride(resolveConditionTheme(useWeatherStore.getState().lastCondition))

  return useWeatherStore.subscribe(function (state, previous) {
    if (state.lastCondition !== previous.lastCondition) {
      setThemeOverride(resolveConditionTheme(state.lastCondition))
    }
  })
}
