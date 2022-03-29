import generateMatrix from './generateMatrix'
import { memo, createContext, useLayoutEffect, useRef } from 'react'
import Week from './Week'
import { css } from '@linaria/core'
import MonthHeader from './MonthHeader'

const styles = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 -1px 0 var(--borders);
`

export const MonthContext = createContext(null)

const Month = ({ year, month }) => {
    const monthRef = useRef(null)
    const matrix = generateMatrix(year, month)
    const date = new Date()

    useLayoutEffect(() => {
        if (new Date().getMonth() === month) {
            requestAnimationFrame(() => {
                monthRef.current.scrollIntoView()
            })
        }
    }, [])

    const isCurrentMonth = date.getMonth() == month

    date.setMonth(month)

    return (
        <MonthContext.Provider value={{ month }}>
            <div className={styles} ref={monthRef}>
                <MonthHeader date={date} />
                {matrix.map((weekDays, i) => {
                    return (
                        <Week
                            key={i}
                            days={weekDays}
                            isCurrentMonth={isCurrentMonth}
                        ></Week>
                    )
                })}
            </div>
        </MonthContext.Provider>
    )
}

export default memo(Month)
