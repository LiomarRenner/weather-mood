import { memo, type ReactNode } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme, useThemedStyles } from '@/core/theme'
import { UIIcon } from '@/core/ui/ui-icon'
import { UIPressable } from '@/core/ui/ui-pressable'
import { UIText } from '@/core/ui/ui-text'
import { UIView } from '@/core/ui/ui-view'
import { createStyles } from '../styles'

function WeatherLoadingComponent(): ReactNode {
  const styles = useThemedStyles(createStyles)
  const { colors } = useTheme()

  return (
    <UIView style={styles.centered} gap="md" accessibilityLiveRegion="polite">
      <ActivityIndicator color={colors.tint} accessibilityLabel="Loading weather" />
      <UIText variant="body" color="textMuted">Loading weather…</UIText>
    </UIView>
  )
}

export const WeatherLoading = memo(WeatherLoadingComponent)

type WeatherErrorProps = {
  readonly onRetry: () => void
}

function WeatherErrorComponent({ onRetry }: WeatherErrorProps): ReactNode {
  const styles = useThemedStyles(createStyles)

  return (
    <UIView style={styles.centered} paddingX="lg" gap="md" accessibilityLiveRegion="polite">
      <UIIcon name="cloud-slash" color="tint" size="xl" />
      <UIText variant="title" style={styles.centeredText} accessibilityRole="header">
        Couldn’t load the weather
      </UIText>
      <UIText variant="body" color="textMuted" style={styles.centeredText}>
        Check your connection and try again.
      </UIText>
      <UIPressable style={styles.retryButton} onPress={onRetry} accessibilityLabel="Try again">
        <UIView paddingX="lg" paddingY="sm">
          <UIText variant="label" color="tint">Try again</UIText>
        </UIView>
      </UIPressable>
    </UIView>
  )
}

export const WeatherError = memo(WeatherErrorComponent)
