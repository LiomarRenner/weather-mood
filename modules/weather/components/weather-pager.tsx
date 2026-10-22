import { FlashList, type ListRenderItemInfo } from '@shopify/flash-list'
import { memo, useCallback, type ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useThemedStyles } from '@/core/theme'
import { UIView } from '@/core/ui/ui-view'
import { useSelectedCityId } from '../state'
import { createStyles } from '../styles'
import { usePagerConductor, type WeatherPage as WeatherPageData } from '../view-model'
import { PageIndicator } from './page-indicator'
import { WeatherPage } from './weather-page'

// FlashList v2 forwards ScrollView props (pagingEnabled) and exposes getScrollableNode,
// which Reanimated uses to attach the worklet scroll handler to the native ScrollView.
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<WeatherPageData>)

// ~60 fps scroll events
const SCROLL_EVENT_THROTTLE_MS = 16

function keyExtractor(page: WeatherPageData): string {
  return page.city.id
}

type WeatherPagerProps = {
  readonly pages: readonly WeatherPageData[]
}

function WeatherPagerComponent({ pages }: WeatherPagerProps): ReactNode {
  const styles = useThemedStyles(createStyles)
  const selectedCityId = useSelectedCityId()
  const {
    pageWidth,
    pageHeight,
    onListLayout,
    initialIndex,
    scrollX,
    scrollHandler,
    backgroundStyle,
    onMomentumScrollEnd,
  } = usePagerConductor(pages)

  const renderItem = useCallback(function ({ item }: ListRenderItemInfo<WeatherPageData>) {
    return <WeatherPage page={item} width={pageWidth} height={pageHeight} />
  }, [pageWidth, pageHeight])

  const currentIndex = Math.max(pages.findIndex(page => page.city.id === selectedCityId), 0)

  return (
    <UIView style={styles.pager}>
      <Animated.View style={[StyleSheet.absoluteFill, backgroundStyle]} />
      <UIView style={styles.pager} onLayout={onListLayout}>
        {pageHeight > 0 && (
          <AnimatedFlashList
            data={pages}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={initialIndex}
            onScroll={scrollHandler}
            scrollEventThrottle={SCROLL_EVENT_THROTTLE_MS}
            onMomentumScrollEnd={onMomentumScrollEnd}
          />
        )}
      </UIView>
      <PageIndicator count={pages.length} currentIndex={currentIndex} pageWidth={pageWidth} scrollX={scrollX} />
    </UIView>
  )
}

export const WeatherPager = memo(WeatherPagerComponent)
