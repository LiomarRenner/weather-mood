import { Tabs } from 'expo-router'
import type { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useTheme, useThemedStyles, type ThemeTokens } from '@/core/theme'

export default function TabLayout (): ReactNode {
  const { colors, spacing, typography } = useTheme()
  const styles = useThemedStyles(createStyles)

  // TODO O auth orquestrara futuramente
  const isLogged = true

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.iconDefault,
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
            backgroundColor: colors.surface,
            height: spacing.xxl,       
            paddingBottom: spacing.sm,
          },
          tabBarLabelStyle: {
            fontSize: typography.size.caption,
            fontFamily: typography.family.medium,
          },
        }}
      >
        <Tabs.Screen name="index" options={{ tabBarLabel: 'Home' }} />
        <Tabs.Screen name="market" options={{ tabBarLabel: 'Market' }} />
        <Tabs.Screen name="profile" options={{ tabBarLabel: 'Profile', href: isLogged ? '/profile' : null }} />
        <Tabs.Screen name="favorites" options={{ tabBarLabel: 'Favorites', href: isLogged ? '/favorites' : null }} />
      </Tabs>
    </SafeAreaView>
  )
}

function createStyles(theme: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: theme.colors.background,
    },
  })
}