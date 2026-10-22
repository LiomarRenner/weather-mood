import { createMockWeatherService } from './mock-weather-service'
import { type WeatherService } from './weather-service'

export { createMockWeatherService, type MockWeatherServiceOptions } from './mock-weather-service'
export { type WeatherService } from './weather-service'

// App-wide instance. Pass { shouldFail: true } to see the error and retry states.
export const weatherService: WeatherService = createMockWeatherService()
