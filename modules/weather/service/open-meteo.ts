// Subset of the Open-Meteo forecast response (https://open-meteo.com/en/docs)
// requested with current=temperature_2m,apparent_temperature,relative_humidity_2m,
// wind_speed_10m,weather_code and the default metric units. Field names mirror the API.

export type OpenMeteoCurrentUnits = {
  readonly time: string
  readonly interval: string
  readonly temperature_2m: string
  readonly apparent_temperature: string
  readonly relative_humidity_2m: string
  readonly wind_speed_10m: string
  readonly weather_code: string
}

export type OpenMeteoCurrent = {
  readonly time: string
  readonly interval: number
  readonly temperature_2m: number
  readonly apparent_temperature: number
  readonly relative_humidity_2m: number
  readonly wind_speed_10m: number
  readonly weather_code: number
}

export type OpenMeteoForecastResponse = {
  readonly latitude: number
  readonly longitude: number
  readonly generationtime_ms: number
  readonly utc_offset_seconds: number
  readonly timezone: string
  readonly timezone_abbreviation: string
  readonly elevation: number
  readonly current_units: OpenMeteoCurrentUnits
  readonly current: OpenMeteoCurrent
}
