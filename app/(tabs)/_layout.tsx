import { Tabs } from 'expo-router'
import type { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useTheme, useThemedStyles, type ThemeTokens } from '@/core/theme'
import { UIIcon } from '@/core/ui/ui-icon'

export default function TabLayout (): ReactNode {
  const { colors, spacing, typography } = useTheme()
  const styles = useThemedStyles(createStyles)

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
        <Tabs.Screen name="index" options={{ tabBarLabel: 'Home', tabBarIcon: ({ color }) => (
          <UIIcon name="house" color={color === colors.tint ? 'tint' : 'muted'} />
        ) }} />
        <Tabs.Screen name="market" options={{ tabBarLabel: 'Market', tabBarIcon: ({ color }) => (
          <UIIcon name="store-front" color={color === colors.tint ? 'tint' : 'muted'} />
        ) }} />
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