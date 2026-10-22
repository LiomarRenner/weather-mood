// Domain types of the weather module (independent of any API shape)

export type WeatherCondition = 'clear' | 'cloudy' | 'rain' | 'snow' | 'storm'

// metric = °C + km/h, imperial = °F + mph
export type UnitSystem = 'metric' | 'imperial'

export type CityId = 'fortaleza' | 'sao-paulo' | 'london' | 'reykjavik' | 'tokyo'

export type City = {
  readonly id: CityId
  readonly name: string
  readonly latitude: number
  readonly longitude: number
}

// Always stored in metric; conversion happens only for display
export type CurrentWeather = {
  readonly cityId: CityId
  readonly condition: WeatherCondition
  readonly temperatureCelsius: number
  readonly feelsLikeCelsius: number
  readonly humidityPercent: number
  readonly windSpeedKmh: number
}

export type WeatherByCity = Readonly<Partial<Record<CityId, CurrentWeather>>>
