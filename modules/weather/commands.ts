// commands.ts: pure business logic of the weather module (no React, no React Native)
import { type ThemeOverride } from '@/core/theme/tokens'
import { CONDITION_PALETTES } from './palettes'
import { type OpenMeteoForecastResponse } from './service/open-meteo'
import { type CityId, type CurrentWeather, type UnitSystem, type WeatherCondition } from './types'

// --- Open-Meteo -> domain ---

// WMO weather interpretation codes used by Open-Meteo -> domain condition.
// Partly cloudy (2), overcast (3), fog (45, 48) and unknown codes fall back to cloudy.
const WMO_CONDITIONS: Readonly<Record<number, WeatherCondition>> = {
  0: 'clear', 1: 'clear', // clear sky, mainly clear
  51: 'rain', 53: 'rain', 55: 'rain', 56: 'rain', 57: 'rain', // drizzle
  61: 'rain', 63: 'rain', 65: 'rain', 66: 'rain', 67: 'rain', // rain
  80: 'rain', 81: 'rain', 82: 'rain', // rain showers
  71: 'snow', 73: 'snow', 75: 'snow', 77: 'snow', 85: 'snow', 86: 'snow', // snow
  95: 'storm', 96: 'storm', 99: 'storm', // thunderstorm (with or without hail)
} as const

export function mapWeatherCode(code: number): WeatherCondition {
  return WMO_CONDITIONS[code] ?? 'cloudy'
}

export function toCurrentWeather(cityId: CityId, response: OpenMeteoForecastResponse): CurrentWeather {
  const { current } = response

  return {
    cityId,
    condition: mapWeatherCode(current.weather_code),
    temperatureCelsius: current.temperature_2m,
    feelsLikeCelsius: current.apparent_temperature,
    humidityPercent: current.relative_humidity_2m,
    windSpeedKmh: current.wind_speed_10m,
  }
}

// --- Units ---

const FAHRENHEIT_SCALE = 1.8
const FAHRENHEIT_OFFSET = 32
const KILOMETERS_PER_MILE = 1.609_344

export function celsiusToFahrenheit(celsius: number): number {
  return celsius * FAHRENHEIT_SCALE + FAHRENHEIT_OFFSET
}

export function kmhToMph(kmh: number): number {
  return kmh / KILOMETERS_PER_MILE
}

export function toggleUnitSystem(unit: UnitSystem): UnitSystem {
  return unit === 'metric' ? 'imperial' : 'metric'
}

// Math.round(-0.4) is -0; normalize so the UI never shows "-0°"
function roundForDisplay(value: number): number {
  return Math.round(value) || 0
}

export function formatTemperature(celsius: number, unit: UnitSystem): string {
  const value = unit === 'metric' ? celsius : celsiusToFahrenheit(celsius)
  return `${roundForDisplay(value)}°${unit === 'metric' ? 'C' : 'F'}`
}

export function formatWindSpeed(kmh: number, unit: UnitSystem): string {
  return unit === 'metric'
    ? `${roundForDisplay(kmh)} km/h`
    : `${roundForDisplay(kmhToMph(kmh))} mph`
}

export function formatHumidity(percent: number): string {
  return `${roundForDisplay(percent)}%`
}

// --- Mood ---

type TemperatureBand = 'cold' | 'cool' | 'mild' | 'warm'

// Upper bounds (exclusive, °C) of each band; anything above the last bound is warm
const COLD_BELOW_CELSIUS = 5
const COOL_BELOW_CELSIUS = 18
const MILD_BELOW_CELSIUS = 26

export function temperatureBand(celsius: number): TemperatureBand {
  if (celsius < COLD_BELOW_CELSIUS) return 'cold'
  if (celsius < COOL_BELOW_CELSIUS) return 'cool'
  if (celsius < MILD_BELOW_CELSIUS) return 'mild'
  return 'warm'
}

const MOOD_LINES: Readonly<Record<WeatherCondition, Readonly<Record<TemperatureBand, string>>>> = {
  clear: { cold: 'Crisp and bright', cool: 'Fresh and sunny', mild: 'Easy and golden', warm: 'Bright and warm' },
  cloudy: { cold: 'Gray and still', cool: 'Soft and muted', mild: 'Calm and mellow', warm: 'Warm and hazy' },
  rain: { cold: 'Cold and drizzly', cool: 'Cozy and rainy', mild: 'Mild and wet', warm: 'Warm and steamy' },
  snow: { cold: 'Quiet and frosty', cool: 'Soft and snowy', mild: 'Slushy and odd', warm: 'Strangely snowy' },
  storm: { cold: 'Wild and icy', cool: 'Restless and loud', mild: 'Electric and moody', warm: 'Heavy and electric' },
} as const

export function moodLine(condition: WeatherCondition, celsius: number): string {
  return MOOD_LINES[condition][temperatureBand(celsius)]
}

// --- Presentation ---

const CONDITION_LABELS: Readonly<Record<WeatherCondition, string>> = {
  clear: 'Clear',
  cloudy: 'Cloudy',
  rain: 'Rain',
  snow: 'Snow',
  storm: 'Thunderstorm',
} as const

export function conditionLabel(condition: WeatherCondition): string {
  return CONDITION_LABELS[condition]
}

export function resolveConditionTheme(condition: WeatherCondition): ThemeOverride {
  return CONDITION_PALETTES[condition]
}

// Index of the page that is (mostly) visible for a horizontal offset
export function pageIndexForOffset(offset: number, pageWidth: number, pageCount: number): number {
  if (pageWidth <= 0 || pageCount <= 0) return 0
  const index = Math.round(offset / pageWidth)
  return Math.min(Math.max(index, 0), pageCount - 1)
}
