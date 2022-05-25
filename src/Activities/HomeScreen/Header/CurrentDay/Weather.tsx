import { FC, memo } from 'react'

import CurrentWeatherIndicator from '../../../../Components/WeatherForecast/Components/CurrentWeatherIndicator'
import useCurrentWeather from '../../../../Components/WeatherForecast/useCurrentWeather'

export interface IWeatherProps {
    onClick: () => void
}

const Weather: FC<IWeatherProps> = ({ onClick }) => {
    const [weather] = useCurrentWeather({
        lat: 53.82318602691756,
        lon: 27.524197005322044,
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
