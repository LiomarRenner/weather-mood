import { useColorScheme } from 'react-native'
import { useMemo, useRef } from 'react'
import { DefaultLightTheme, DefaultDarkTheme, type ThemeTokens } from './tokens'

// State = theme tokens + system metadata
type ThemeState = ThemeTokens & {
  readonly isDark: boolean
  readonly scheme: 'light' | 'dark'
}

export function useTheme(): ThemeState {
  const systemScheme = useColorScheme() ?? 'light'
  
  return useMemo(() => {
    const isDark = systemScheme === 'dark'
    const theme = isDark ? DefaultDarkTheme : DefaultLightTheme

    return {
      ...theme, // colors, spacing and typography
      isDark,
      scheme: systemScheme,
    } as const
  }, [systemScheme])
}

export function useThemedStyles<T>(factory: (theme: ThemeTokens) => T): T {
  const theme = useTheme() // theme holds every token
  
  const factoryRef = useRef(factory)
  factoryRef.current = factory

  // Pass the full token object to the factory
  return useMemo(() => factoryRef.current(theme), [theme])
}