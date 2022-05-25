import { IWeatherForecast, ICurrentWeather } from './types'

const API_KEY = '05f54247c744089118273418596a534a'

export const getWeatherForecast = async (
    lat: number,
    lon: number
): Promise<IWeatherForecast> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
    )

    const data = await response.json()

    return data
}

export const getCurrentWeather = async (
    lat: number,
    lon: number
): Promise<ICurrentWeather> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
    )

    const data = await response.json()

    return data
}
