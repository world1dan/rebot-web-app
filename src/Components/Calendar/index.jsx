import { css } from '@linaria/core'
import { createContext } from 'react'
import Suspense from '../Suspense'
import Month from './Month'

export const CalendarContext = createContext(null)

const styles = css`
    display: grid;
    gap: 20px;

    @media (min-width: 820px) {
        grid-template-columns: 1fr 1fr;
    }
`

const Calendar = ({ customDayContentGenerator }) => {
    const monthes = []

    const date = new Date()

    for (let i = 0; i < 12; i++) {
        date.setMonth(i)

        monthes.push(<Month year={date.getFullYear()} month={date.getMonth()} key={i} />)
    }

    return (
        <CalendarContext.Provider value={{ customDayContentGenerator }}>
            <Suspense delay={500} rowsCount={6} rowsHeight={240} twoColumns>
                <div className={styles}>{monthes}</div>
            </Suspense>
        </CalendarContext.Provider>
    )
}

export default Calendar
