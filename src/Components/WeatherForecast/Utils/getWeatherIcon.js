import { AnimatedWeatherIcons, StaticWeatherIcons } from '../../Icons/Weather'

const weatherIconsMap = {
    '01d': 'ClearDay',
    '01n': 'ClearNight',
    '02d': 'PartlyCloudyDay',
    '02n': 'PartlyCloudyNight',
    '03d': 'Cloudy',
    '03n': 'Cloudy',
    '04d': 'Overcast',
    '04n': 'Overcast',
    '09d': 'Rain',
    '09n': 'Rain',
    '10d': 'PartlyCloudyDayRain',
    '10n': 'PartlyCloudyNightRain',
    '11d': 'ThunderstormsDayRain',
    '11n': 'ThunderstormsNnightRain',
    '13d': 'PartlyCloudyDaySnow',
    '13n': 'PartlyCloudyNightSnow',
    '50d': 'Mist',
    '50n': 'Mist',
}

const findIcon = (iconID) => {
    const iconName = weatherIconsMap[iconID]

    return iconName ?? 'ClearDay'
}

export const getStaticWeatherIcon = (iconID) => {
    const svg = StaticWeatherIcons[findIcon(iconID)]

    return function Icon({ width }) {
        return <img src={svg} width={width} />
    }
}

export const getAnimatedWeatherIcon = (iconID) => {
    const svg = AnimatedWeatherIcons[findIcon(iconID)]

    return function Icon({ width }) {
        return <img src={svg} width={width} />
    }
}
