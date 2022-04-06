import { useState, useContext, useRef } from 'react'

import { TimeTableContext } from '../../../Context'

import Wraper from '../../../Components/Wraper'
import DayCard from '../DayCard'
import Header from './Header'
import ScrollView from '../../../Components/ScrollView'

import './style.scss'

const Week = () => {
    const dayNum = new Date().getDay()
    const isWeekend = dayNum == 0 || dayNum == 6

    const [week, setWeek] = useState(isWeekend ? 3 : 2)
    const timetable = useContext(TimeTableContext)?.[week]
    const prevWeek = useRef(2)

    const dayCards = []

    for (let day in timetable) {
        dayCards.push(
            <DayCard
                key={day}
                dayNum={parseInt(day)}
                week={week}
                timetable={timetable[day]}
                pathToDay={week + '.' + day}
            />
        )
    }

    const nextWeek = () => setWeek(week + 1)
    const prewWeek = () => setWeek(week - 1)

    const direction = prevWeek.current < week ? 1 : -1

    prevWeek.current = week

    return (
        <Wraper>
            <Header
                week={week}
                prewWeek={prewWeek}
                nextWeek={nextWeek}
                direction={direction}
            />
            <ScrollView>
                <div className="week-grid">
                    {dayCards.length > 0 ? (
                        dayCards
                    ) : (
                        <div className="no-timetable-alert">Тут ничего нет</div>
                    )}
                </div>
            </ScrollView>
        </Wraper>
    )
}

export default Week
