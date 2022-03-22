import { createContext } from 'react'
import Month from './Month'

export const CalendarContext = createContext(null)

const Calendar = ({ customDayContentGenerator }) => {
    const monthes = []

    const date = new Date()

    for (let i = 0; i < 12; i++) {
        date.setMonth(i)

        monthes.push(
            <Month year={date.getFullYear()} month={date.getMonth()} key={i} />
        )
    }

    return (
        <CalendarContext.Provider value={{ customDayContentGenerator }}>
            {monthes}
        </CalendarContext.Provider>
    )
}

export default Calendar
