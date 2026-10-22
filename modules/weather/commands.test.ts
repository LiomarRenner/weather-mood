import { describe, expect, it } from 'vitest'
import {
  celsiusToFahrenheit,
  conditionLabel,
  formatHumidity,
  formatTemperature,
  formatWindSpeed,
  kmhToMph,
  mapWeatherCode,
  moodLine,
  pageIndexForOffset,
  resolveConditionTheme,
  temperatureBand,
  toCurrentWeather,
  toggleUnitSystem,
} from './commands'
import { CONDITION_PALETTES } from './palettes'
import { CITY_FIXTURES, METRIC_CURRENT_UNITS } from './service/mock-fixtures'
import { type OpenMeteoForecastResponse } from './service/open-meteo'

// Numbers live in case objects so the no-magic-numbers rule stays on in tests too
const WMO_CASES = [
  { code: 0, condition: 'clear' },
  { code: 1, condition: 'clear' },
  { code: 2, condition: 'cloudy' },
  { code: 3, condition: 'cloudy' },
  { code: 45, condition: 'cloudy' },
  { code: 53, condition: 'rain' },
  { code: 63, condition: 'rain' },
  { code: 81, condition: 'rain' },
  { code: 73, condition: 'snow' },
  { code: 86, condition: 'snow' },
  { code: 95, condition: 'storm' },
  { code: 99, condition: 'storm' },
  { code: -1, condition: 'cloudy' },
] as const

const TEMPERATURE_CASES = [
  { celsius: 0, fahrenheit: 32 },
  { celsius: 100, fahrenheit: 212 },
  { celsius: -40, fahrenheit: -40 },
] as const

const WIND_CASES = [
  { kmh: 1.609_344, mph: 1 },
  { kmh: 100, mph: 62.137_12 },
] as const

const FORMAT_CASES = {
  temperature: { celsius: 30.6, metric: '31°C', imperial: '87°F' },
  negativeZero: { celsius: -0.4, metric: '0°C' },
  wind: { kmh: 24.1, metric: '24 km/h', imperial: '15 mph' },
  humidity: { percent: 88.6, label: '89%' },
} as const

const BAND_CASES = [
  { celsius: 4.9, band: 'cold' },
  { celsius: 5, band: 'cool' },
  { celsius: 18, band: 'mild' },
  { celsius: 26, band: 'warm' },
] as const

const MOOD_CASES = [
  { condition: 'clear', celsius: 31, mood: 'Bright and warm' },
  { condition: 'clear', celsius: 10, mood: 'Fresh and sunny' },
  { condition: 'rain', celsius: 11, mood: 'Cozy and rainy' },
  { condition: 'snow', celsius: -2, mood: 'Quiet and frosty' },
] as const

const PAGING = { width: 400, count: 5, precision: 5 } as const
const PAGE_CASES = [
  { offset: 0, index: 0 },
  { offset: 560, index: 1 }, // 1.4 pages
  { offset: 640, index: 2 }, // 1.6 pages
  { offset: -400, index: 0 }, // overscroll before the first page
  { offset: 4000, index: 4 }, // overscroll past the last page
] as const

describe('mapWeatherCode', () => {
  it.each(WMO_CASES)('maps WMO code $code to $condition', ({ code, condition }) => {
    expect(mapWeatherCode(code)).toBe(condition)
  })
})

describe('toCurrentWeather', () => {
  it('maps the Open-Meteo current block to the domain model', () => {
    const { current } = CITY_FIXTURES.london
    const response: OpenMeteoForecastResponse = {
      latitude: 0,
      longitude: 0,
      generationtime_ms: 0,
      utc_offset_seconds: 0,
      timezone: 'GMT',
      timezone_abbreviation: 'GMT',
      elevation: 0,
      current_units: METRIC_CURRENT_UNITS,
      current,
    }

    expect(toCurrentWeather('london', response)).toEqual({
      cityId: 'london',
      condition: 'rain',
      temperatureCelsius: current.temperature_2m,
      feelsLikeCelsius: current.apparent_temperature,
      humidityPercent: current.relative_humidity_2m,
      windSpeedKmh: current.wind_speed_10m,
    })
  })

  it('gives every mocked city its owner-defined condition', () => {
    const expected = { 'fortaleza': 'clear', 'sao-paulo': 'cloudy', 'london': 'rain', 'reykjavik': 'snow', 'tokyo': 'storm' } as const
    for (const [cityId, condition] of Object.entries(expected)) {
      const fixture = CITY_FIXTURES[cityId as keyof typeof expected]
      expect(mapWeatherCode(fixture.current.weather_code)).toBe(condition)
    }
  })
})

describe('unit conversion', () => {
  it.each(TEMPERATURE_CASES)('converts $celsius °C to $fahrenheit °F', ({ celsius, fahrenheit }) => {
    expect(celsiusToFahrenheit(celsius)).toBeCloseTo(fahrenheit, PAGING.precision)
  })

  it.each(WIND_CASES)('converts $kmh km/h to $mph mph', ({ kmh, mph }) => {
    expect(kmhToMph(kmh)).toBeCloseTo(mph, PAGING.precision)
  })

  it('toggles between metric and imperial', () => {
    expect(toggleUnitSystem('metric')).toBe('imperial')
    expect(toggleUnitSystem('imperial')).toBe('metric')
  })
})

describe('formatting', () => {
  it('formats temperature in the selected unit', () => {
    const { celsius, metric, imperial } = FORMAT_CASES.temperature
    expect(formatTemperature(celsius, 'metric')).toBe(metric)
    expect(formatTemperature(celsius, 'imperial')).toBe(imperial)
  })

  it('never shows negative zero', () => {
    const { celsius, metric } = FORMAT_CASES.negativeZero
    expect(formatTemperature(celsius, 'metric')).toBe(metric)
  })

  it('formats wind speed in the selected unit', () => {
    const { kmh, metric, imperial } = FORMAT_CASES.wind
    expect(formatWindSpeed(kmh, 'metric')).toBe(metric)
    expect(formatWindSpeed(kmh, 'imperial')).toBe(imperial)
  })

  it('formats humidity as a percentage', () => {
    expect(formatHumidity(FORMAT_CASES.humidity.percent)).toBe(FORMAT_CASES.humidity.label)
  })

  it('labels conditions for display', () => {
    expect(conditionLabel('storm')).toBe('Thunderstorm')
    expect(conditionLabel('clear')).toBe('Clear')
  })
})

describe('moodLine', () => {
  it.each(BAND_CASES)('puts $celsius °C in the $band band', ({ celsius, band }) => {
    expect(temperatureBand(celsius)).toBe(band)
  })

  it.each(MOOD_CASES)('reads "$mood" for $condition at $celsius °C', ({ condition, celsius, mood }) => {
    expect(moodLine(condition, celsius)).toBe(mood)
  })
})

describe('resolveConditionTheme', () => {
  it('returns the palette of the condition', () => {
    expect(resolveConditionTheme('rain')).toBe(CONDITION_PALETTES.rain)
    expect(resolveConditionTheme('rain').scheme).toBe('dark')
    expect(resolveConditionTheme('clear').scheme).toBe('light')
  })
})

describe('pageIndexForOffset', () => {
  it.each(PAGE_CASES)('maps offset $offset to page $index', ({ offset, index }) => {
    expect(pageIndexForOffset(offset, PAGING.width, PAGING.count)).toBe(index)
  })

  it('returns 0 before the list is measured', () => {
    expect(pageIndexForOffset(PAGING.width, 0, PAGING.count)).toBe(0)
  })
})
