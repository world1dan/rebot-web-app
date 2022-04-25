import { getWeatherForecast } from './weatherAPI'
import { Weather } from './types'
import useLocalStorage from '../../Hooks/useLocalStorage'
import useInterval from '../../Hooks/useInterval'

export interface IUseWeatherOptions {
    lat: number
    lon: number
    weatherCacheKey: string
}

const useWeather = ({ lat, lon, weatherCacheKey }: IUseWeatherOptions): Weather => {
    const [weather, setWeather] = useLocalStorage(weatherCacheKey, null)
    const [lastFetch, setLastFetch] = useLocalStorage('weather-last-fetch', null)

    useInterval(() => {
        if (process.env.NODE_ENV === 'production' || !weather) {
            if (lastFetch) {
                const now = new Date()
                const diff = now.getTime() - new Date(lastFetch).getTime()
                if (diff < 10000) {
                    return
                }
            }

            getWeatherForecast(lat, lon).then((weather: Weather) => {
                setWeather(weather)
                setLastFetch(new Date())
            })
        }
    }, 600000)

    return weather
}

export default useWeather
