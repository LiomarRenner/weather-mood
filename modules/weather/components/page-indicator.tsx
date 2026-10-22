import { memo, type ReactNode } from 'react'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated'
import { useTheme, useThemedStyles } from '@/core/theme'
import { UIView } from '@/core/ui/ui-view'
import { createStyles } from '../styles'

type PageDotProps = {
  readonly index: number
  readonly pageWidth: number
  readonly scrollX: SharedValue<number>
}

function PageDot({ index, pageWidth, scrollX }: PageDotProps): ReactNode {
  const styles = useThemedStyles(createStyles)
  const { spacing, opacity } = useTheme()
  const inactiveWidth = spacing.sm
  const activeWidth = spacing.lg
  const inactiveOpacity = opacity.disabled

  // Same scroll offset as the background: the dot grows as its page comes into view
  const animatedStyle = useAnimatedStyle(function () {
    const inputRange = [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth]
    return {
      width: interpolate(scrollX.value, inputRange, [inactiveWidth, activeWidth, inactiveWidth], Extrapolation.CLAMP),
      opacity: interpolate(scrollX.value, inputRange, [inactiveOpacity, 1, inactiveOpacity], Extrapolation.CLAMP),
    }
  })

  return <Animated.View style={[styles.dot, animatedStyle]} />
}

type PageIndicatorProps = {
  readonly count: number
  readonly currentIndex: number
  readonly pageWidth: number
  readonly scrollX: SharedValue<number>
}

function PageIndicatorComponent({ count, currentIndex, pageWidth, scrollX }: PageIndicatorProps): ReactNode {
  const styles = useThemedStyles(createStyles)
  const dots = Array.from({ length: count }, function (_, index) {
    return index
  })

  return (
    <UIView
      style={styles.indicator}
      paddingY="md"
      gap="sm"
      accessible
      accessibilityLabel={`City ${currentIndex + 1} of ${count}`}
    >
      {dots.map(function (index) {
        return <PageDot key={index} index={index} pageWidth={pageWidth} scrollX={scrollX} />
      })}
    </UIView>
  )
}

export const PageIndicator = memo(PageIndicatorComponent)
