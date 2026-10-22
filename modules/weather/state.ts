// state.ts: zustand store of the weather module. Read it through the atomic selector
// hooks below so each component re-renders only for the slice it uses.
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mmkvStateStorage } from '@/core/storage/mmkv-state-storage'
import { type RequestStatus } from '@/core/types/request-status'
import { DEFAULT_CITY_ID } from './cities'
import { toggleUnitSystem } from './commands'
import { type CityId, type UnitSystem, type WeatherByCity, type WeatherCondition } from './types'

const STORE_NAME = 'weather'
const STORE_VERSION = 1

type PersistedWeatherState = {
  readonly selectedCityId: CityId
  readonly unit: UnitSystem
  // Drives the app theme on the next launch, before any data has loaded
  readonly lastCondition: WeatherCondition
}

type WeatherState = PersistedWeatherState & {
  readonly status: RequestStatus
  readonly weatherByCity: WeatherByCity
  readonly setLoading: () => void
  readonly setFailed: () => void
  readonly setWeather: (weatherByCity: WeatherByCity) => void
  readonly selectCity: (cityId: CityId) => void
  readonly toggleUnit: () => void
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    function (set) {
      return {
        selectedCityId: DEFAULT_CITY_ID,
        unit: 'metric',
        lastCondition: 'clear',
        status: 'loading',
        weatherByCity: {},
        setLoading() {
          set({ status: 'loading' })
        },
        setFailed() {
          set({ status: 'error' })
        },
        setWeather(weatherByCity) {
          set(function (state) {
            const condition = weatherByCity[state.selectedCityId]?.condition ?? state.lastCondition
            return { status: 'success', weatherByCity, lastCondition: condition }
          })
        },
        selectCity(cityId) {
          set(function (state) {
            const condition = state.weatherByCity[cityId]?.condition ?? state.lastCondition
            return { selectedCityId: cityId, lastCondition: condition }
          })
        },
        toggleUnit() {
          set(function (state) {
            return { unit: toggleUnitSystem(state.unit) }
          })
        },
      }
    },
    {
      name: STORE_NAME,
      version: STORE_VERSION,
      storage: createJSONStorage(function () {
        return mmkvStateStorage
      }),
      partialize(state): PersistedWeatherState {
        return {
          selectedCityId: state.selectedCityId,
          unit: state.unit,
          lastCondition: state.lastCondition,
        }
      },
    },
  ),
)

// --- Atomic selectors ---

function selectStatus(state: WeatherState): RequestStatus {
  return state.status
}

function selectWeatherByCity(state: WeatherState): WeatherByCity {
  return state.weatherByCity
}

function selectSelectedCityId(state: WeatherState): CityId {
  return state.selectedCityId
}

function selectUnit(state: WeatherState): UnitSystem {
  return state.unit
}

export function useWeatherStatus(): RequestStatus {
  return useWeatherStore(selectStatus)
}

export function useWeatherByCity(): WeatherByCity {
  return useWeatherStore(selectWeatherByCity)
}

export function useSelectedCityId(): CityId {
  return useWeatherStore(selectSelectedCityId)
}

export function useUnitSystem(): UnitSystem {
  return useWeatherStore(selectUnit)
}
