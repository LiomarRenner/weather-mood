import { useCallback, useMemo, type ReactNode } from 'react'
import {
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
  type PressableStateCallbackType,
} from 'react-native'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { useThemedStyles, type ThemeTokens } from '@/core/theme'
import { resolveAccessibilityState } from './accessibility-state'
import { type UIPressableProps } from './types'

export function UIPressableComponent({
  haptics = true,
  busy = false,
  disabled,
  onPressIn,
  style,
  accessibilityState,
  ...props
}: UIPressableProps): ReactNode {
  const styles = useThemedStyles(createStyles)
  const isDisabled = Boolean(disabled) || busy

  // Haptics fire on touch down, not release, so feedback feels immediate
  const handlePressIn = useCallback(function (event: GestureResponderEvent) {
    if (haptics) void impactAsync(ImpactFeedbackStyle.Light)
    onPressIn?.(event)
  }, [haptics, onPressIn])

  const resolvedAccessibilityState = useMemo(function () {
    return resolveAccessibilityState(Boolean(disabled), busy, accessibilityState)
  }, [disabled, busy, accessibilityState])

  const resolveStyle = useCallback(function (state: PressableStateCallbackType) {
    return [
      state.pressed && styles.pressed,
      isDisabled && styles.disabled,
      typeof style === 'function' ? style(state) : style,
    ]
  }, [styles, isDisabled, style])

  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      disabled={isDisabled}
      accessibilityState={resolvedAccessibilityState}
      onPressIn={handlePressIn}
      style={resolveStyle}
    />
  )
}

function createStyles(theme: ThemeTokens) {
  return StyleSheet.create({
    pressed: {
      opacity: theme.opacity.pressed,
    },
    disabled: {
      opacity: theme.opacity.disabled,
    },
  })
}
