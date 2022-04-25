import { css } from '@linaria/core'
import { FC } from 'react'
import { Main, Wind } from '../../types'

import { StaticWeatherIcons, AnimatedWeatherIcons } from '../../../Icons/Weather'

const styles = css`
    display: grid;
    flex-direction: column;
    align-items: center;
    grid-template-rows: 24px 24px;

    .data-row {
        display: flex;
        align-items: center;
        gap: 3px;
        color: var(--text2);
        font-size: 13px;
        font-weight: 600;
    }
`

export interface IHumidityAndWindProps {
    humidity: Main['humidity']
    windSpeed: Wind['speed']
}

const HumidityAndWind: FC<IHumidityAndWindProps> = ({ humidity, windSpeed }) => {
    return (
        <div className={styles}>
            <div className="data-row">
                <img src={StaticWeatherIcons.Humidity} alt="humidity" width={34} />

                {humidity + '%'}
            </div>
            <div className="data-row">
                <img src={AnimatedWeatherIcons.Wind} alt="wind" width={30} />
                {windSpeed.toFixed(1) + ' м/с'}
            </div>
        </div>
    )
}

export default HumidityAndWind
