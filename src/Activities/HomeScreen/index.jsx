import React, { memo, useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"

import { TimeTableContext } from "../../Context"
import useWeekDay from "../../Hooks/useWeekDay"

import Day from "../TimeTable/Day"
import Header from "./Header"
import Now from "./Now"
import Wraper from "../../Components/Wraper"
import Notes from "./Notes"


import "./style.scss"



const HomeScreen = () => {

    const [showNow, setShowNow] = useState(false)
    const timetable = useContext(TimeTableContext)

    let { dayNum, isWeekend } = useWeekDay()



    useEffect(() => {
        const update = () => {
            const hours = new Date().getHours()
            setShowNow(hours >= 7 && hours != 24)
        }

        update()
        setInterval(update, 1000)
    }, [])


    const hours = new Date().getHours()


    let isWeekEnded = false

    if (isWeekend) {
        dayNum = 1
        isWeekEnded = true
    } else if (hours > 15) {
        if (dayNum == 5) {
            dayNum = 1
            isWeekEnded = true
        } else {
            dayNum += 1
        }
    }
    
    return (
        <Wraper>
            <div className="HomeScreen">

                <Header/>
                <div id="homescreen-layout">
                    <div className="side-left">
                        { timetable?.[2]?.[dayNum] && !isWeekEnded && showNow && <Now dayData={timetable[2][dayNum]} pathToDay={"2." + dayNum}/> }
                        <Notes/>
                    </div>
                    <div className="side-right">
                        { (timetable?.[2] || timetable?.[3]) && 
                            <Day 
                                dayNum={dayNum}
                                week={isWeekEnded ? 3 : 2}
                                timetable={timetable[isWeekEnded ? 3 : 2][dayNum]}
                                pathToDay={(isWeekEnded ? 3 : 2) + "." + dayNum}
                            />
                        }
                    </div> 
                </div>
            </div>
        </Wraper>
    )
}




export default memo(HomeScreen)