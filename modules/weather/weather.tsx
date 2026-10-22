import { type ReactNode } from 'react'
import { useThemedStyles } from '@/core/theme'
import { UIView } from '@/core/ui/ui-view'
import { WeatherPager } from './components/weather-pager'
import { WeatherError, WeatherLoading } from './components/weather-status'
import { createStyles } from './styles'
import { useWeatherConductor } from './view-model'

export function Weather(): ReactNode {
  const styles = useThemedStyles(createStyles)
  const { status, pages, retry } = useWeatherConductor()

  return (
    <UIView style={styles.container}>
      {status === 'loading' && <WeatherLoading />}
      {status === 'error' && <WeatherError onRetry={retry} />}
      {status === 'success' && <WeatherPager pages={pages} />}
    </UIView>
  )
}
