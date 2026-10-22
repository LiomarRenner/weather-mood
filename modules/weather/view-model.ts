// view-model.ts: the Conductor. Wires store slices, actions and commands to the screen,
// keeping weather.tsx and its components free of logic.
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'
import {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated'
import { type RequestStatus } from '@/core/types/request-status'
import { loadWeather, settleOnCity, toggleUnit } from './actions'
import { CITIES } from './cities'
import { pageIndexForOffset, resolveConditionTheme } from './commands'
import { useSelectedCityId, useWeatherByCity, useWeatherStatus } from './state'
import { type City, type CurrentWeather } from './types'

export type WeatherPage = {
  readonly city: City
  readonly weather: CurrentWeather
}

export type WeatherConductor = {
  readonly status: RequestStatus
  readonly pages: readonly WeatherPage[]
  readonly retry: () => void
}

export function useWeatherConductor(): WeatherConductor {
  const status = useWeatherStatus()
  const weatherByCity = useWeatherByCity()

  useEffect(function () {
    void loadWeather()
  }, [])

  const pages = useMemo(function () {
    return CITIES.flatMap(function (city) {
      const weather = weatherByCity[city.id]
      return weather ? [{ city, weather }] : []
    })
  }, [weatherByCity])

  const retry = useCallback(function () {
    void loadWeather()
  }, [])

  return { status, pages, retry }
}

export type PagerConductor = {
  readonly pageWidth: number
  readonly initialIndex: number
  readonly scrollX: SharedValue<number>
  readonly scrollHandler: ReturnType<typeof useAnimatedScrollHandler>
  readonly backgroundStyle: ReturnType<typeof useAnimatedStyle>
  readonly onMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

export function usePagerConductor(pages: readonly WeatherPage[]): PagerConductor {
  const { width: pageWidth } = useWindowDimensions()
  const selectedCityId = useSelectedCityId()

  // Read once: afterwards the list owns the position and reports it back on settle
  const [initialIndex] = useState(function () {
    return Math.max(pages.findIndex(page => page.city.id === selectedCityId), 0)
  })

  const scrollX = useSharedValue(initialIndex * pageWidth)

  // Runs on the UI thread for every scroll frame
  const scrollHandler = useAnimatedScrollHandler({
    onScroll(event) {
      scrollX.value = event.contentOffset.x
    },
  })

  const { inputRange, backgrounds } = useMemo(function () {
    return {
      inputRange: pages.map((_, index) => index * pageWidth),
      backgrounds: pages.map(page => resolveConditionTheme(page.weather.condition).colors.background),
    }
  }, [pages, pageWidth])

  // Interpolates between neighbouring palettes while dragging
  const backgroundStyle = useAnimatedStyle(function () {
    // interpolateColor needs at least two stops
    const backgroundColor = inputRange.length > 1
      ? interpolateColor(scrollX.value, inputRange, backgrounds)
      : backgrounds[0]
    return { backgroundColor }
  })

  // The global theme only switches once the page has settled
  const onMomentumScrollEnd = useCallback(function (event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = pageIndexForOffset(event.nativeEvent.contentOffset.x, pageWidth, pages.length)
    const page = pages[index]
    if (page) settleOnCity(page.city.id)
  }, [pages, pageWidth])

  return { pageWidth, initialIndex, scrollX, scrollHandler, backgroundStyle, onMomentumScrollEnd }
}

export function useUnitToggle(): () => void {
  return useCallback(function () {
    toggleUnit()
  }, [])
}
