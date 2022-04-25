import { css } from '@linaria/core'
import { FC } from 'react'
import ActionSheet from '../ActionSheet'
import useWeather from './useWeather'
import Header from './Components/Header'
import WeatherForDay from './Components/WeatherForDay'
import { WeatherConditionsCardDateType } from './Components/WeatherСonditionsCard'

import ForecastsList from './Components/ForecastsList'

export interface IWeatherForecastProps {
    handleClose: () => void
}

const styles = css`
    height: 500px;
    padding: 12px;

    .descr {
        text-align: center;
        font-size: 14px;
        margin-top: -16px;
        font-weight: 600;
        text-transform: capitalize;
    }
`

const WeatherForecast: FC<IWeatherForecastProps> = ({ handleClose }) => {
    const weather = useWeather({
        lat: 53.82318602691756,
        lon: 27.524197005322044,
        weatherCacheKey: 'weather-forecast-cache',
    })

    if (!weather) return null

    return (
        <ActionSheet onClose={handleClose} bottomCloseBtn={false}>
            <div className={styles}>
                <Header city={weather.city} />
                <WeatherForDay
                    weather={weather}
                    sunrise={weather.city.sunrise}
                    sunset={weather.city.sunset}
                />
                <div className="descr">{weather.list[0].weather[0].description}</div>
                <ForecastsList
                    forecast={weather.list.filter((element) => {
                        const day = new Date(element.dt * 1000).getDate()
                        const currentDay = new Date().getDate()

                        return day === currentDay || day === currentDay + 1
                    })}
                    cardsDateType={WeatherConditionsCardDateType.HOUR}
                    title="Сегодня / Завтра"
                />
                <ForecastsList
                    forecast={weather.list.filter((element) => {
                        return element.dt_txt.includes('12:00:00')
                    })}
                    cardsDateType={WeatherConditionsCardDateType.DAY}
                    title="На 5 дней"
                />
            </div>
        </ActionSheet>
    )
}

export default WeatherForecast
