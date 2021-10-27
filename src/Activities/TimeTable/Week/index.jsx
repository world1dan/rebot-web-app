import React, { useState, memo, useContext, useRef } from "react"


import { TimeTableContext } from "../../../Context"
import useWeekDay from "../../../Hooks/useWeekDay"

import Wraper from "../../../Components/Wraper"
import Day from "../Day"


import "./style.scss"



const Week = () => {
    const { isWeekend } = useWeekDay()

    const [ week, setWeek ] = useState(isWeekend ? 3 : 2)


    const timetable = useContext(TimeTableContext)?.[week]


    const grid = useRef(null)

    const title = week == 1 ? "Прошлая неделя" :
        week == 2 ? "Эта неделя" : "Следующая неделя"

    const days = []
    let day
        
    for (day in timetable) {
        days.push(<Day key={day} dayNum={parseInt(day)} week={week} timetable={timetable[day]} pathToDay={week + "." + day}/>)
    }


    const animate = () => {
        grid.current.animate([
            {
                transform: "translateY(0)",
                opacity: 1
            },
            {
                transform: "translateY(2%)",
                opacity: 0.5
            },
            {
                transform: "translateY(0)",
                opacity: 1
            },
        ], {
            ease: "ease-in-out",
            duration: 280
        })
    }

    const nextWeek = () => {
        setWeek(week + 1)
        animate()
    }
    const prewWeek = () => { 
        setWeek(week - 1)
        animate()
    }


    return (
        <Wraper>
            <header id="week-header">
                { week > 1 
                    ?
                    <button onClick={prewWeek}>
                        <i className="fas fa-chevron-left fa-2x"></i>
                    </button>
                    : 
                    <button className="unactive">
                        <i className="fas fa-chevron-left fa-2x"></i>
                    </button>
                }
                <span>{title}</span>
                { week < 3
                    ?
                    <button onClick={nextWeek}>
                        <i className="fas fa-chevron-right fa-2x"></i>
                    </button>
                    :
                    <button className="unactive">
                        <i className="fas fa-chevron-right fa-2x"></i>
                    </button>
                }
            </header>
            <div className="week-grid" ref={grid}>
                { days.length != 0 ? 
                    days : 
                    <div className="no-timetable-alert content-card">Тут каникулы)</div>
                }
            </div>
        </Wraper>
    )
}


export default memo(Week)