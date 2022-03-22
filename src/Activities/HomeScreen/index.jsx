import { memo, useContext, useState } from 'react'

import { TimeTableContext } from '../../Context'
import useWeekDay from '../../Hooks/useWeekDay'
import useInterval from '../../Hooks/useInterval'

import Header from './Header'
import Now from './Now'
import Wraper from '../../Components/Wraper'
import Notes from './Notes'
import DaysCarousel from './DaysCarousel'

import './style.scss'

const shoudShowNow = () => {
    const hours = new Date().getHours()
    return hours >= 7 && hours != 24
}

const HomeScreen = () => {
    const [showNow, setShowNow] = useState(shoudShowNow)
    const timetable = useContext(TimeTableContext)

    useInterval(() => {
        setShowNow(shoudShowNow)
    }, 1000)

    let { dayNum, isWeekend } = useWeekDay()
    const hours = new Date().getHours()
    let isWeekEnded = false

    if (isWeekend) {
        dayNum = 1
        isWeekEnded = true
    } else if (hours >= 15) {
        if (dayNum == 5) {
            dayNum = 1
            isWeekEnded = true
        } else {
            dayNum += 1
        }
    }

    return (
        <Wraper>
            <Header />
            <div className="homescreen-layout">
                <div className="side-left">
                    {timetable?.[2]?.[dayNum] && !isWeekEnded && showNow && (
                        <Now
                            dayData={timetable[2][dayNum]}
                            pathToDay={'2.' + dayNum}
                        />
                    )}
                    <Notes />
                </div>

                <DaysCarousel
                    timetable={timetable}
                    dayNum={dayNum}
                    isWeekEnded={isWeekEnded}
                    isWeekend={isWeekend}
                />
            </div>
        </Wraper>
    )
}

export default memo(HomeScreen)
