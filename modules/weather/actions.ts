// actions.ts: side effects of the weather module (service calls and store updates)
import { CITIES } from './cities'
import { toCurrentWeather } from './commands'
import { weatherService, type WeatherService } from './service'
import { useWeatherStore } from './state'
import { type CityId, type CurrentWeather, type WeatherByCity } from './types'

function indexByCity(readings: readonly CurrentWeather[]): WeatherByCity {
  return Object.fromEntries(readings.map(function (reading) {
    return [reading.cityId, reading]
  }))
}

// Loads every city at once: the pager needs each condition to animate between palettes
export async function loadWeather(service: WeatherService = weatherService): Promise<void> {
  useWeatherStore.getState().setLoading()

  try {
    const readings = await Promise.all(CITIES.map(async function (city) {
      return toCurrentWeather(city.id, await service.getCurrentWeather(city.id))
    }))
    useWeatherStore.getState().setWeather(indexByCity(readings))
  } catch {
    useWeatherStore.getState().setFailed()
  }
}

// Called when the pager settles on a page; also switches the app theme (see theme-sync.ts)
export function settleOnCity(cityId: CityId): void {
  useWeatherStore.getState().selectCity(cityId)
}

export function toggleUnit(): void {
  useWeatherStore.getState().toggleUnit()
}
