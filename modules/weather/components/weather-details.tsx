import { memo, type ReactNode } from 'react'
import { useThemedStyles } from '@/core/theme'
import { UIIcon } from '@/core/ui/ui-icon'
import { type UIIconName } from '@/core/ui/ui-icon/types'
import { UIText } from '@/core/ui/ui-text'
import { UIView } from '@/core/ui/ui-view'
import { formatHumidity, formatTemperature, formatWindSpeed } from '../commands'
import { createStyles } from '../styles'
import { type CurrentWeather, type UnitSystem } from '../types'

type DetailItemProps = {
  readonly icon: UIIconName
  readonly label: string
  readonly value: string
}

function DetailItem({ icon, label, value }: DetailItemProps): ReactNode {
  const styles = useThemedStyles(createStyles)

  // Read as one element: "Humidity, 78%"
  return (
    <UIView style={styles.detailItem} gap="xs" accessible accessibilityLabel={`${label}, ${value}`}>
      <UIIcon name={icon} color="tint" size="sm" />
      <UIText variant="caption" color="textMuted">{label}</UIText>
      <UIText variant="label" weight="extraBold">{value}</UIText>
    </UIView>
  )
}

type WeatherDetailsProps = {
  readonly weather: CurrentWeather
  readonly unit: UnitSystem
}

function WeatherDetailsComponent({ weather, unit }: WeatherDetailsProps): ReactNode {
  const styles = useThemedStyles(createStyles)

  return (
    <UIView style={styles.details} padding="md" gap="sm">
      <DetailItem icon="thermometer" label="Feels like" value={formatTemperature(weather.feelsLikeCelsius, unit)} />
      <DetailItem icon="drop" label="Humidity" value={formatHumidity(weather.humidityPercent)} />
      <DetailItem icon="wind" label="Wind" value={formatWindSpeed(weather.windSpeedKmh, unit)} />
    </UIView>
  )
}

export const WeatherDetails = memo(WeatherDetailsComponent)
