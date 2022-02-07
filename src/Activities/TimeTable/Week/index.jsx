import { useState, memo, useContext, useRef } from 'react'

import { TimeTableContext } from '../../../Context'
import useWeekDay from '../../../Hooks/useWeekDay'

import Wraper from '../../../Components/Wraper'
import DayCard from '../DayCard'
import Header from './Header'

import './style.scss'

const Week = () => {
    const { isWeekend } = useWeekDay()
    const [week, setWeek] = useState(isWeekend ? 3 : 2)

    const timetable = useContext(TimeTableContext)?.[week]

    const prevWeek = useRef(2)

    const days = []
    let day

    for (day in timetable) {
        days.push(
            <DayCard
                key={day}
                dayNum={parseInt(day)}
                week={week}
                timetable={timetable[day]}
                pathToDay={week + '.' + day}
            />
        )
    }

    const nextWeek = () => {
        setWeek(week + 1)
    }
    const prewWeek = () => {
        setWeek(week - 1)
    }

    const direction = prevWeek.current < week ? 1 : -1

    prevWeek.current = week

    return (
        <Wraper>
            <Header
                key="header"
                week={week}
                prewWeek={prewWeek}
                nextWeek={nextWeek}
                direction={direction}
            />

            <div className="week-grid">
                {days.length != 0 ? (
                    days
                ) : (
                    <div className="no-timetable-alert">Тут каникулы)</div>
                )}
            </div>
        </Wraper>
    )
}

export default memo(Week)
