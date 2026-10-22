import { useColorScheme } from 'react-native'
import { useMemo, useRef } from 'react'
import { DefaultLightTheme, DefaultDarkTheme, type ThemeTokens } from './tokens'
import { useThemeOverride } from './theme-store'

// State = theme tokens + system metadata
type ThemeState = ThemeTokens & {
  readonly isDark: boolean
  readonly scheme: 'light' | 'dark'
}

export function useTheme(): ThemeState {
  const systemScheme = useColorScheme() ?? 'light'
  // An override (e.g. the weather palette) wins over the system light/dark setting
  const override = useThemeOverride()

  return useMemo(() => {
    const scheme = override?.scheme ?? (systemScheme === 'dark' ? 'dark' : 'light')
    const isDark = scheme === 'dark'
    const theme = isDark ? DefaultDarkTheme : DefaultLightTheme

    return {
      ...theme, // colors, spacing and typography
      colors: override?.colors ?? theme.colors,
      isDark,
      scheme,
    } as const
  }, [systemScheme, override])
}

export function useThemedStyles<T>(factory: (theme: ThemeTokens) => T): T {
  const theme = useTheme() // theme holds every token

  const factoryRef = useRef(factory)
  factoryRef.current = factory

  // Pass the full token object to the factory
  return useMemo(() => factoryRef.current(theme), [theme])
}
