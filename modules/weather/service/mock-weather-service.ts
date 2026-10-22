import { type City } from '../types'
import { CITY_FIXTURES, METRIC_CURRENT_UNITS } from './mock-fixtures'
import { type OpenMeteoForecastResponse } from './open-meteo'
import { type WeatherService } from './weather-service'

export type MockWeatherServiceOptions = {
  // Simulated network latency per request
  readonly latencyMs: number
  // Forces every request to reject, to exercise the error and retry states
  readonly shouldFail: boolean
}

const MOCK_GENERATION_TIME_MS = 0.05

function wait(durationMs: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, durationMs)
  })
}

// Returns canned data shaped exactly like the Open-Meteo forecast response
export class MockWeatherService implements WeatherService {
  private readonly options: MockWeatherServiceOptions

  constructor(options: MockWeatherServiceOptions) {
    this.options = options
  }

  async fetchCurrentWeather(city: City): Promise<OpenMeteoForecastResponse> {
    await wait(this.options.latencyMs)

    if (this.options.shouldFail) {
      throw new Error(`Mock weather request failed for ${city.name}`)
    }

    const fixture = CITY_FIXTURES[city.id]

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
}
