import { useCallback, useState } from 'react'
import { css } from '@linaria/core'
import DateTime from './DateTime'

import Weather from './Weather'

import WeatherForecast from '../../../../Components/WeatherForecast'

const styles = css`
    display: flex;
    gap: 8px;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    z-index: 99;
`

const CurrentDay = () => {
    const [weatherForecastOpen, setWeatherForecastOpen] = useState<boolean>(false)

    const openWeatherForecast = useCallback(() => {
        setWeatherForecastOpen(true)
    }, [])

    return (
        <>
            <div className={styles}>
                <Weather onClick={openWeatherForecast} />
                <DateTime />
            </div>
            {weatherForecastOpen && (
                <WeatherForecast handleClose={() => setWeatherForecastOpen(false)} />
            )}
        </>
    )
}

export default CurrentDay
