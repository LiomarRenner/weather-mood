import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useTheme } from '@/core/theme'

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
  /* Silencioso no esqueleto */
})

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Cabinet Grotesk (Locais)
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
        // Aqui entrarão as cargas de fontes ou assets futuramente
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
  const { scheme} = useTheme()

  return (
    <SafeAreaProvider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
