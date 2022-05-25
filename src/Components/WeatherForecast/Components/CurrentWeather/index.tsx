import { css } from '@linaria/core'
import { FC } from 'react'
import { City, ICurrentWeather } from '../../types'

import CurrentWeatherIndicator from '../CurrentWeatherIndicator'
import HumidityAndWind from './HumidityAndWind'
import SunriseSunset from './SunriseSunset'
const styles = css`
    display: flex;
    justify-content: space-around;

    width: 100%;
    align-items: center;
    justify-content: center;
`
export interface ICurrentWeatherProps {
    weather: ICurrentWeather
    sunrise: City['sunrise']
    sunset: City['sunset']
}

const CurrentWeather: FC<ICurrentWeatherProps> = ({ weather, sunrise, sunset }) => {
    return (
        <div className={styles}>
            <SunriseSunset sunrise={sunrise} sunset={sunset} />
            <CurrentWeatherIndicator
                iconSize={100}
                fontSize={32}
                animate
                weather={weather}
            />
            <HumidityAndWind
                humidity={weather.main.humidity}
                windSpeed={weather.wind.speed}
            />
        </div>
    )
}

export default CurrentWeather
