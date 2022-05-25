import { css } from '@linaria/core'
import { FC } from 'react'

import { StaticWeatherIcons } from '../../../Icons/Weather'

const styles = css`
    display: grid;
    flex-direction: column;
    align-items: center;
    grid-template-rows: 24px 24px;
    flex-grow: 1;
    justify-content: center;
    .data-row {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--text2);
        font-size: 13px;
        font-weight: 600;
    }
`
export interface ISunsetSunriseProps {
    sunrise: number
    sunset: number
}

const formatTime = (time: number) => {
    const date = new Date(time * 1000)

    return date.toLocaleTimeString('ru-Ru', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

const SunriseSunset: FC<ISunsetSunriseProps> = ({ sunrise, sunset }) => {
    const sunriseTime = formatTime(sunrise)
    const sunsetTime = formatTime(sunset)

    return (
        <div className={styles}>
            <div className="data-row">
                <img src={StaticWeatherIcons.Sunrise} alt="sunrise" width={34} />
                {sunriseTime}
            </div>
            <div className="data-row">
                <img src={StaticWeatherIcons.Sunset} alt="sunrise" width={34} />
                {sunsetTime}
            </div>
        </div>
    )
}

export default SunriseSunset
