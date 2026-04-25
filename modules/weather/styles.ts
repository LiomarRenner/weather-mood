import { StyleSheet } from 'react-native'
import { type ThemeTokens } from '@/core/theme'

export function createStyles(colors: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}