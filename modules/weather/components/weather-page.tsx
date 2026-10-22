import { memo, useMemo, type ReactNode } from 'react'
import { useThemedStyles } from '@/core/theme'
import { UIIcon } from '@/core/ui/ui-icon'
import { UIPressable } from '@/core/ui/ui-pressable'
import { UIText } from '@/core/ui/ui-text'
import { UIView } from '@/core/ui/ui-view'
import { conditionLabel, formatTemperature, moodLine } from '../commands'
import { useUnitSystem } from '../state'
import { createStyles } from '../styles'
import { useUnitToggle, type WeatherPage as WeatherPageData } from '../view-model'
import { CONDITION_ICONS } from './condition-icon'
import { WeatherDetails } from './weather-details'

const UNIT_HINTS = {
  metric: 'Switches to Fahrenheit and miles per hour',
  imperial: 'Switches to Celsius and kilometers per hour',
} as const

type WeatherPageProps = {
  readonly page: WeatherPageData
  readonly width: number
  readonly height: number
}

// One city: hero + detail row. Colors come from the global theme, which follows the
// settled page; only the background behind the pager is interpolated while dragging.
function WeatherPageComponent({ page, width, height }: WeatherPageProps): ReactNode {
  const styles = useThemedStyles(createStyles)
  const unit = useUnitSystem()
  const onToggleUnit = useUnitToggle()
  const { city, weather } = page

  const sizeStyle = useMemo(function () {
    return { width, height }
  }, [width, height])

  const temperature = formatTemperature(weather.temperatureCelsius, unit)

  return (
    <UIView style={[styles.page, sizeStyle]} paddingX="lg" paddingY="xl" gap="lg">
      <UIView gap="xs">
        <UIText variant="title" accessibilityRole="header">{city.name}</UIText>
        <UIView style={styles.row} gap="sm">
          <UIIcon name={CONDITION_ICONS[weather.condition]} color="tint" />
          <UIText variant="label" color="textMuted">{conditionLabel(weather.condition)}</UIText>
        </UIView>
      </UIView>

      <UIPressable
        style={styles.temperature}
        onPress={onToggleUnit}
        accessibilityLabel={`Temperature ${temperature}`}
        accessibilityHint={UNIT_HINTS[unit]}
      >
        <UIText variant="display">{temperature}</UIText>
      </UIPressable>

      <UIText variant="label">{moodLine(weather.condition, weather.temperatureCelsius)}</UIText>

      <WeatherDetails weather={weather} unit={unit} />
    </UIView>
  )
}

export const WeatherPage = memo(WeatherPageComponent)
