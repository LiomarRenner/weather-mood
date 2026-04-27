import { StyleSheet } from 'react-native'
import { type ThemeTokens } from '@/core/theme'

export function createStyles(theme: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}