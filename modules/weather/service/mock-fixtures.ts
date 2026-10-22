import { type CityId } from '../types'
import { type OpenMeteoCurrent, type OpenMeteoCurrentUnits } from './open-meteo'

// Open-Meteo default (metric) units for the requested current fields
export const METRIC_CURRENT_UNITS: OpenMeteoCurrentUnits = {
  time: 'iso8601',
  interval: 'seconds',
  temperature_2m: '°C',
  apparent_temperature: '°C',
  relative_humidity_2m: '%',
  wind_speed_10m: 'km/h',
  weather_code: 'wmo code',
} as const

type CityFixture = {
  readonly timezone: string
  readonly timezoneAbbreviation: string
  readonly utcOffsetSeconds: number
  readonly elevation: number
  readonly current: OpenMeteoCurrent
}

// One fixed reading per city, chosen so every condition is represented:
// WMO 0 = clear sky, 3 = overcast, 63 = moderate rain, 73 = moderate snow, 95 = thunderstorm
export const CITY_FIXTURES: Readonly<Record<CityId, CityFixture>> = {
  'fortaleza': {
    timezone: 'America/Fortaleza',
    timezoneAbbreviation: 'GMT-3',
    utcOffsetSeconds: -10_800,
    elevation: 21,
    current: {
      time: '2026-10-22T14:00',
      interval: 900,
      temperature_2m: 30.6,
      apparent_temperature: 34.2,
      relative_humidity_2m: 66,
      wind_speed_10m: 22.3,
      weather_code: 0,
    },
  },
  'sao-paulo': {
    timezone: 'America/Sao_Paulo',
    timezoneAbbreviation: 'GMT-3',
    utcOffsetSeconds: -10_800,
    elevation: 760,
    current: {
      time: '2026-10-22T14:00',
      interval: 900,
      temperature_2m: 19.4,
      apparent_temperature: 19.1,
      relative_humidity_2m: 78,
      wind_speed_10m: 9.7,
      weather_code: 3,
    },
  },
  'london': {
    timezone: 'Europe/London',
    timezoneAbbreviation: 'GMT+1',
    utcOffsetSeconds: 3600,
    elevation: 23,
    current: {
      time: '2026-10-22T18:00',
      interval: 900,
      temperature_2m: 11.2,
      apparent_temperature: 8.9,
      relative_humidity_2m: 89,
      wind_speed_10m: 24.1,
      weather_code: 63,
    },
  },
  'reykjavik': {
    timezone: 'Atlantic/Reykjavik',
    timezoneAbbreviation: 'GMT',
    utcOffsetSeconds: 0,
    elevation: 34,
    current: {
      time: '2026-10-22T17:00',
      interval: 900,
      temperature_2m: -2.4,
      apparent_temperature: -8.1,
      relative_humidity_2m: 82,
      wind_speed_10m: 27.8,
      weather_code: 73,
    },
  },
  'tokyo': {
    timezone: 'Asia/Tokyo',
    timezoneAbbreviation: 'GMT+9',
    utcOffsetSeconds: 32_400,
    elevation: 40,
    current: {
      time: '2026-10-23T02:00',
      interval: 900,
      temperature_2m: 23.7,
      apparent_temperature: 26.4,
      relative_humidity_2m: 91,
      wind_speed_10m: 35.6,
      weather_code: 95,
    },
  },
} as const
