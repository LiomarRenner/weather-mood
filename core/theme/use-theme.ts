import { useColorScheme } from 'react-native'
import { useMemo, useRef } from 'react'
import { DefaultLightTheme, DefaultDarkTheme, type ThemeTokens } from './tokens'

// O State agora é a união dos Tokens + Metadados do sistema
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
      ...theme, // colors, spacing e typography
      isDark,
      scheme: systemScheme,
    } as const
  }, [systemScheme])
}

export function useThemedStyles<T>(factory: (theme: ThemeTokens) => T): T {
  const theme = useTheme() // Agora theme contém tudo
  
  const factoryRef = useRef(factory)
  factoryRef.current = factory

  // Passamos o objeto completo de tokens para a factory
  return useMemo(() => factoryRef.current(theme), [theme])
}