import { type City, type CityId } from './types'

// Order defines the paging order on the weather screen
export const CITIES: readonly City[] = [
  { id: 'fortaleza', name: 'Fortaleza', latitude: -3.7172, longitude: -38.5431 },
  { id: 'sao-paulo', name: 'São Paulo', latitude: -23.5475, longitude: -46.6361 },
  { id: 'london', name: 'London', latitude: 51.5085, longitude: -0.1257 },
  { id: 'reykjavik', name: 'Reykjavik', latitude: 64.1355, longitude: -21.8954 },
  { id: 'tokyo', name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
] as const

// First launch starts here
export const DEFAULT_CITY_ID: CityId = 'fortaleza'
