import { DarkTheme, DefaultTheme, ThemeProvider, type Theme } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen'
import { useEffect, useMemo } from 'react'
import 'react-native-reanimated'

import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useTheme } from '@/core/theme'
import { startWeatherTheme } from '@/modules/weather/theme-sync'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
void preventAutoHideAsync().catch(function () {
  /* Ignored in the walking skeleton */
})

// The current city's condition themes the whole app; start before the first render
startWeatherTheme()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Cabinet Grotesk (local files)
    'Cabinet-Thin': require('../assets/fonts/CabinetGrotesk-Thin.otf'),
    'Cabinet-ExtraLight': require('../assets/fonts/CabinetGrotesk-Extralight.otf'),
    'Cabinet-Light': require('../assets/fonts/CabinetGrotesk-Light.otf'),
    'Cabinet-Regular': require('../assets/fonts/CabinetGrotesk-Regular.otf'),
    'Cabinet-Medium': require('../assets/fonts/CabinetGrotesk-Medium.otf'),
    'Cabinet-Bold': require('../assets/fonts/CabinetGrotesk-Bold.otf'),
    'Cabinet-ExtraBold': require('../assets/fonts/CabinetGrotesk-Extrabold.otf'),
    'Cabinet-Black': require('../assets/fonts/CabinetGrotesk-Black.otf'),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(function() {
    async function prepare(): Promise<void> {
      try {
        // Future font or asset loading goes here
        if (loaded) await hideAsync()
      } catch (error) {
        console.warn(error)
      }
    }

    void prepare()
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const { isDark, colors } = useTheme()

  // Navigation chrome (headers, modal backgrounds) follows the active palette too
  const navigationTheme = useMemo(function (): Theme {
    const base = isDark ? DarkTheme : DefaultTheme
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.tint,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
      },
    }
  }, [isDark, colors])

  return (
    <SafeAreaProvider>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style={colors.statusBar} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
