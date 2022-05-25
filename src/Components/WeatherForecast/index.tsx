import { css } from '@linaria/core'
import { FC } from 'react'
import ActionSheet from '../ActionSheet'

import Header from './Components/Header'
import CurrentWeather from './Components/CurrentWeather'
import { WeatherConditionsCardDateType } from './Components/WeatherСonditionsCard'

import ForecastsList from './Components/ForecastsList'

import useCurrentWeather from './useCurrentWeather'
import useWeatherForecast from './useWeatherForecast'

export interface IWeatherForecastProps {
    handleClose: () => void
}

const styles = css`
    padding: 12px;

    .descr {
        text-align: center;
        font-size: 14px;
        margin-top: -16px;
        font-weight: 600;
        text-transform: capitalize;
    }
`

const coords = {
    lat: 53.82318602691756,
    lon: 27.524197005322044,
}

const WeatherForecast: FC<IWeatherForecastProps> = ({ handleClose }) => {
    const [currentWeather, fetchCurrentWeather] = useCurrentWeather(coords)
    const [weatherForecast, fetchWeatherForecast] = useWeatherForecast(coords)

    if (!currentWeather || !weatherForecast) return null

    const updateWeather = () => {
        fetchCurrentWeather()
        fetchWeatherForecast()
    }

    return (
        <ActionSheet onClose={handleClose} bottomCloseBtn={false}>
            <div className={styles}>
                <Header city={weatherForecast.city} updateWeather={updateWeather} />
                <CurrentWeather
                    weather={currentWeather}
                    sunrise={weatherForecast.city.sunrise}
                    sunset={weatherForecast.city.sunset}
                />
                <div className="descr">{currentWeather.weather[0].description}</div>
                <ForecastsList
                    forecast={weatherForecast.list.filter((element) => {
                        const day = new Date(element.dt * 1000).getDate()
                        const currentDay = new Date().getDate()

                        return day === currentDay || day === currentDay + 1
                    })}
                    cardsDateType={WeatherConditionsCardDateType.HOUR}
                    title="Сегодня / Завтра"
                />
                <ForecastsList
                    forecast={weatherForecast.list.filter((element) => {
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
