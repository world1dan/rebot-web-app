import { useState } from 'react'

import useInterval from '../../../Hooks/useInterval'

const options = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}

const getParsedDate = () => {
    return new Date().toLocaleString('ru', options)
}

const Time = () => {
    const [date, setDate] = useState(getParsedDate)

    useInterval(() => {
        setDate(getParsedDate())
    }, 1000)

    return <div className="time">{date}</div>
}

export default Time
