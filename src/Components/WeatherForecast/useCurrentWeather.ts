import { getCurrentWeather } from './weatherAPI'
import { ICurrentWeather } from './types'
import useLocalStorage from '../../Hooks/useLocalStorage'
import useInterval from '../../Hooks/useInterval'

export interface IUseWeatherOptions {
    lat: number
    lon: number
}

const useCurrentWeather = ({
    lat,
    lon,
}: IUseWeatherOptions): [ICurrentWeather, () => void] => {
    const [currentWeather, setCurrentWeather] = useLocalStorage(
        'weather-current-cache',
        null
    )
    const [lastFetch, setLastFetch] = useLocalStorage('weather-current-last-fetch', null)

    const fetchCurrentWeather = () => {
        if (process.env.NODE_ENV === 'production' || !currentWeather) {
            if (lastFetch) {
                const now = new Date()
                const diff = now.getTime() - new Date(lastFetch).getTime()
                if (diff < 5000) {
                    return
                }
            }

            getCurrentWeather(lat, lon).then((weather: ICurrentWeather) => {
                setCurrentWeather(weather)
                setLastFetch(new Date())
            })
        }
    }

    useInterval(fetchCurrentWeather, 600000)

    return [currentWeather, fetchCurrentWeather]
}

export default useCurrentWeather
