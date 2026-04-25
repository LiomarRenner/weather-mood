import { useColorScheme } from 'react-native'
import { useMemo, useRef } from 'react'
import { DefaultLightTheme, DefaultDarkTheme, type ThemeTokens } from './tokens'

type ThemeState = {
  readonly colors: ThemeTokens
  readonly isDark: boolean
  readonly scheme: 'light' | 'dark'
}

export function useTheme(): ThemeState {
  const systemScheme = useColorScheme() ?? 'light'
  
  // O memo garante que o objeto retornado seja o MESMO na memória 
  // enquanto o scheme do sistema não mudar.
  return useMemo(() => {
    const isDark = systemScheme === 'dark'
    const colors = isDark ? DefaultDarkTheme : DefaultLightTheme

    return {
      colors,
      isDark,
      scheme: systemScheme,
    } as const
  }, [systemScheme])
}

export function useThemedStyles<T>(factory: (colors: ThemeTokens) => T): T {
  const { colors } = useTheme()
  
  // Usamos ref para evitar que a factory mude a dependência do useMemo
  const factoryRef = useRef(factory)
  factoryRef.current = factory

  return useMemo(() => factoryRef.current(colors), [colors])
}