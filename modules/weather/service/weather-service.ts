import { type City } from '../types'
import { type OpenMeteoForecastResponse } from './open-meteo'

// Data source contract. The mock and a future Open-Meteo client both return the raw
// API shape; mapping to the domain happens in commands.ts.
export interface WeatherService {
  fetchCurrentWeather(city: City): Promise<OpenMeteoForecastResponse>
}
