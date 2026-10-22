import { StyleSheet } from 'react-native'
import { type ThemeTokens } from '@/core/theme'

export function createStyles(theme: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    pager: {
      flex: 1,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    page: {
      flex: 1,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    temperature: {
      alignSelf: 'flex-start',
    },
    details: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: theme.spacing.md,
    },
    detailItem: {
      flex: 1,
      alignItems: 'center',
    },
    centeredText: {
      textAlign: 'center',
    },
    retryButton: {
      borderColor: theme.colors.tint,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: theme.spacing.lg,
    },
    indicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      height: theme.spacing.sm,
      borderRadius: theme.spacing.xs,
      backgroundColor: theme.colors.tint,
    },
  })
}

export type WeatherStyles = ReturnType<typeof createStyles>
