import { getWeatherForecast } from './weatherAPI'
import { IWeatherForecast } from './types'
import useLocalStorage from '../../Hooks/useLocalStorage'
import useInterval from '../../Hooks/useInterval'

export interface IUseWeatherOptions {
    lat: number
    lon: number
}

const useWeatherForecast = ({
    lat,
    lon,
}: IUseWeatherOptions): [IWeatherForecast, () => void] => {
    const [weatherForecast, setWeatherForecast] = useLocalStorage(
        'weather-forecast-cache',
        null
    )
    const [lastFetch, setLastFetch] = useLocalStorage('weather-forecast-last-fetch', null)

    const fetchWeatherForecast = () => {
        if (process.env.NODE_ENV === 'production' || !weatherForecast) {
            if (lastFetch) {
                const now = new Date()
                const diff = now.getTime() - new Date(lastFetch).getTime()
                if (diff < 5000) {
                    return
                }
            }

            getWeatherForecast(lat, lon).then((weather) => {
                setWeatherForecast(weather)
                setLastFetch(new Date())
            })
        }
    }

    useInterval(fetchWeatherForecast, 600000)

    return [weatherForecast, fetchWeatherForecast]
}

export default useWeatherForecast
