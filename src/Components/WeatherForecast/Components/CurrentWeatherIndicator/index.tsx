import { memo } from 'react'
import { FC } from 'react'
import { css } from '@linaria/core'

import { getAnimatedWeatherIcon, getStaticWeatherIcon } from '../../Utils/getWeatherIcon'

import { Weather } from '../../types'

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
    weather: Weather
}

const CurrentWeatherIndicator: FC<ICurrentWeatherIndicatorProps> = ({
    iconSize,
    fontSize,
    onClick,
    animate,
    weather,
}) => {
    if (!weather?.list) return null

    const weatherIconID = weather.list[0].weather[0].icon
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
            {weather.list[0].main.temp.toFixed(0) + '°'}
            <Icon width={iconSize} />
        </div>
    )
}

export default memo(CurrentWeatherIndicator)
