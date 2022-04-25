import { css } from '@linaria/core'
import { FC } from 'react'
import { City, Weather } from '../../types'

import CurrentWeatherIndicator from '../CurrentWeatherIndicator'
import HumidityAndWind from './HumidityAndWind'
import SunriseSunset from './SunriseSunset'
const styles = css`
    display: flex;
    justify-content: space-around;
    gap: 30px;

    width: 100%;
    align-items: center;
    justify-content: center;
`
export interface IWeatherForDayProps {
    weather: Weather
    sunrise: City['sunrise']
    sunset: City['sunset']
}

const WeatherForDay: FC<IWeatherForDayProps> = ({ weather, sunrise, sunset }) => {
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
                humidity={weather.list[0].main.humidity}
                windSpeed={weather.list[0].wind.speed}
            />
        </div>
    )
}

export default WeatherForDay
