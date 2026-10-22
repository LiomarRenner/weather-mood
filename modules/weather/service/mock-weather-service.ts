import { CITIES } from '../cities'
import { type CityId } from '../types'
import { CITY_FIXTURES, METRIC_CURRENT_UNITS } from './mock-fixtures'
import { type OpenMeteoForecastResponse } from './open-meteo'
import { type WeatherService } from './weather-service'

export type MockWeatherServiceOptions = {
  // Simulated network latency per request
  readonly latencyMs?: number
  // Forces every request to reject, to exercise the error and retry states
  readonly shouldFail?: boolean
}

const DEFAULT_LATENCY_MS = 1200
const MOCK_GENERATION_TIME_MS = 0.05

function wait(durationMs: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, durationMs)
  })
}

// Returns canned data shaped exactly like the Open-Meteo forecast response
export function createMockWeatherService(options: MockWeatherServiceOptions = {}): WeatherService {
  const latencyMs = options.latencyMs ?? DEFAULT_LATENCY_MS
  const shouldFail = options.shouldFail ?? false

  async function getCurrentWeather(cityId: CityId): Promise<OpenMeteoForecastResponse> {
    await wait(latencyMs)

    const city = CITIES.find(candidate => candidate.id === cityId)
    if (shouldFail || !city) {
      throw new Error(`Mock weather request failed for ${cityId}`)
    }

    const fixture = CITY_FIXTURES[cityId]

    return {
      latitude: city.latitude,
      longitude: city.longitude,
      generationtime_ms: MOCK_GENERATION_TIME_MS,
      utc_offset_seconds: fixture.utcOffsetSeconds,
      timezone: fixture.timezone,
      timezone_abbreviation: fixture.timezoneAbbreviation,
      elevation: fixture.elevation,
      current_units: METRIC_CURRENT_UNITS,
      current: fixture.current,
    }
  }

  return { getCurrentWeather }
}
