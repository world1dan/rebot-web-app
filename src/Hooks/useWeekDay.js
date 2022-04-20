import { useState } from 'react'
import useInterval from './useInterval.ts'

const getWeekDay = () => {
    const dayNum = new Date().getDay()
    const isWeekend = dayNum == 0 || dayNum == 6

    return {
        dayNum,
        isWeekend,
    }
}

const useWeekDay = () => {
    const [weekDay, setWeekDay] = useState(getWeekDay)

    useInterval(() => {
        const day = getWeekDay()

        if (day.dayNum !== weekDay.dayNum) {
            setWeekDay(day)
        }
    }, 1000)

    return weekDay
}

export default useWeekDay
