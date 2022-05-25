import { memo } from 'react'
import { FC } from 'react'
import { css } from '@linaria/core'

import { getAnimatedWeatherIcon, getStaticWeatherIcon } from '../../Utils/getWeatherIcon'

import { ICurrentWeather } from '../../types'

const styles = css`
    display: flex;
    align-items: center;

    font-size: 17px;
    transform: translate3d(0, 0, 0);
    font-weight: bold;
`

export interface ICurrentWeatherIndicatorProps {
    iconSize: number
    fontSize: number
    onClick?: () => void
    animate?: boolean
    weather: ICurrentWeather
}

const CurrentWeatherIndicator: FC<ICurrentWeatherIndicatorProps> = ({
    iconSize,
    fontSize,
    onClick,
    animate,
    weather,
}) => {
    if (!weather) return null

    const weatherIconID = weather?.weather[0].icon

    if (!weatherIconID) return null

    const Icon = animate
        ? getAnimatedWeatherIcon(weatherIconID)
        : getStaticWeatherIcon(weatherIconID)

    return (
        <div
            className={styles}
            onClick={onClick}
            style={{
                fontSize,
            }}
        >
            {weather.main.temp.toFixed(0) + '°'}
            <Icon width={iconSize} />
        </div>
    )
}

export default memo(CurrentWeatherIndicator)
