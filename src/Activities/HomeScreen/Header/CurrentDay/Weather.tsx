import { memo } from 'react'
import useWeather from '../../../../Components/WeatherForecast/useWeather'
import CurrentWeatherIndicator from '../../../../Components/WeatherForecast/Components/CurrentWeatherIndicator'

const Weather = ({ onClick }) => {
    const weather = useWeather({
        lat: 53.82318602691756,
        lon: 27.524197005322044,
        weatherCacheKey: 'weather-forecast-cache',
    })
    return (
        <CurrentWeatherIndicator
            iconSize={44}
            fontSize={14}
            onClick={onClick}
            weather={weather}
        />
    )
}

export default memo(Weather)
