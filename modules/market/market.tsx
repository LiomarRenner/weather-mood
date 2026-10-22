import type { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { useThemedStyles, type ThemeTokens } from '@/core/theme'
import { UIText } from '@/core/ui/ui-text'
import { UIView } from '@/core/ui/ui-view'

// Placeholder until the market feature is designed
export function Market(): ReactNode {
  const styles = useThemedStyles(createStyles)

  return (
    <UIView style={styles.container} padding="lg" gap="sm">
      <UIText variant="caption" weight="medium" color="tint">COMING SOON</UIText>
      <UIText variant="title">Market</UIText>
      <UIText color="textMuted" style={styles.description}>
        This section is still being designed.
      </UIText>
    </UIView>
  )
}

function createStyles(theme: ThemeTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    description: {
      textAlign: 'center',
    },
  })
}
