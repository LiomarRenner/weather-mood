import { type UIIconName } from '@/core/ui/ui-icon/types'
import { type WeatherCondition } from '../types'

export const CONDITION_ICONS: Readonly<Record<WeatherCondition, UIIconName>> = {
  clear: 'sun',
  cloudy: 'cloud',
  rain: 'cloud-rain',
  snow: 'snowflake',
  storm: 'cloud-lightning',
} as const
