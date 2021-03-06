import { css } from '@linaria/core'
import { WeatherCondition } from '../../types'
import WeatherŠ”onditionsCard, {
    WeatherConditionsCardDateType,
} from '../WeatherŠ”onditionsCard'

const styles = css`
    width: 100%;

    .forecast {
        display: flex;
        gap: 8px;
        overflow-x: scroll;
        padding-bottom: 12px;

        &::-webkit-scrollbar {
            height: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: var(--bg2);
            border-radius: 8px;
        }
    }

    .title {
        font-size: 15px;
        font-weight: 600;

        padding: 13px;
        padding-bottom: 10px;
    }
`

interface IForecastsListProps {
    forecast: WeatherCondition[]
    title: string
    cardsDateType: WeatherConditionsCardDateType
}

const ForecastsList = ({ forecast, title, cardsDateType }: IForecastsListProps) => {
    return (
        <div className={styles}>
            <div className="title">{title}</div>
            <div className="forecast">
                {forecast.map((weather) => {
                    return (
                        <WeatherŠ”onditionsCard
                            key={weather.dt}
                            weather={weather}
                            dateType={cardsDateType}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ForecastsList
