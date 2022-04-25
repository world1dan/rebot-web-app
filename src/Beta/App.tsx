import './Styles/style.scss'
import './Styles/colors.css'

import Login from './Pages/Login'
import WeatherForecast from './WeatherForecast'

const App = () => {
    const fetchWeather = async () => {
        const response = await fetch(
            'https://api.openweathermap.org/data/2.5/forecast?q=London,uk&appid=05f54247c744089118273418596a534a'
        )
        const data = await response.json()
        console.log(data)
    }

    return (
        <div
            style={{
                padding: '16px',
            }}
            onClick={fetchWeather}
        >
            <WeatherForecast />
        </div>
    )
}

export default App
