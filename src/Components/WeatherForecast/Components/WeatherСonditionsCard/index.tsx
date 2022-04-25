import { css } from '@linaria/core'
import { FC } from 'react'
import { WeatherCondition } from '../../types'
import { getAnimatedWeatherIcon } from '../../Utils/getWeatherIcon'

export enum WeatherConditionsCardDateType {
    HOUR = 'hour',
    DAY = 'day',
}

const styles = css`
    width: 70px;
    background: var(--bg4);
    flex-shrink: 0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    box-shadow: 0 0 0 1.5px var(--lvl4-borders) inset;

    .temperature {
        font-size: 17px;
        text-align: center;
        font-weight: 600;
    }
    .time {
        color: var(--text2);
        text-align: center;

        font-size: 13px;
    }
`

interface IWeatherСonditionsCardProps {
    weather: WeatherCondition
    dateType: WeatherConditionsCardDateType
}

const WeatherСonditionsCard: FC<IWeatherСonditionsCardProps> = ({
    weather,
    dateType,
}) => {
    const WeatherIcon = getAnimatedWeatherIcon(weather.weather[0].icon)

    const date = new Date(weather.dt * 1000)
    const day = date.toLocaleString('ru-RU', { weekday: 'short' })
    const hour = date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' })
    return (
        <div className={styles}>
            <WeatherIcon width="38" />
            <div className="temperature">{weather.main.temp.toFixed(0)}°</div>
            <div className="time">{dateType == 'hour' ? hour : day}</div>
        </div>
    )
}

export default WeatherСonditionsCard
