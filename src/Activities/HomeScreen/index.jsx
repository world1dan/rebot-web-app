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



const HomeScreen = (props) => {

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



    let afterTitle = null

    const hours = new Date().getHours()

    if (isWeekend) {
        afterTitle = ""
        dayNum = 1
    } else if (hours > 15) {
        if (dayNum == 5) {
            afterTitle = ""
            dayNum = 1
        } else {
            afterTitle = ""
            dayNum += 1
        }
    }

    return (
        <Wraper>
            <div className="HomeScreen">
                <Header setSettingsOpen={props.setSettingsOpen}/>
                { timetable && !isWeekend && showNow && <Now day_data={timetable[2][dayNum]} pathToDay={"2." + dayNum}/> }
                <div id="homescreen-layout">
                    <div className="side-left">
                        <Notes/>
                    </div>
                    <div className="side-right">
                        { timetable && <Day dayNum={dayNum}
                            week={isWeekend ? 3 : 2}
                            timetable={timetable[isWeekend ? 3 : 2][dayNum]}
                            pathToDay={(isWeekend ? 3 : 2) + "." + dayNum} 
                            afterTitle={afterTitle}/> }
                    </div>
                </div>
            </div>
        </Wraper>
    )
}


HomeScreen.propTypes = {
    setSettingsOpen: PropTypes.func.isRequired
}

export default memo(HomeScreen)