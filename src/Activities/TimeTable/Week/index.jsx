import React, { useState, memo, useContext, useRef } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { TimeTableContext } from "../../../Context"
import useWeekDay from "../../../Hooks/useWeekDay"

import Wraper from "../../../Components/Wraper"
import Day from "../Day"
import Header from "./Header"

import "./style.scss"



const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? "100%" : "-100%",
            position: "absolute",
        }
    },
    center: {
        x: 0,
        position: "static",
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? "100%" : "-100%",
            position: "absolute",
            opacity: 0
        }
    }
}



const Week = () => {
    const { isWeekend } = useWeekDay()


    const prevWeek = useRef(2)
    const [ week, setWeek ] = useState(isWeekend ? 3 : 2)
    const timetable = useContext(TimeTableContext)?.[week]


    const days = []
    let day

    for (day in timetable) {
        days.push(
            <Day 
                key={day} 
                dayNum={parseInt(day)} 
                week={week} 
                timetable={timetable[day]} 
                pathToDay={week + "." + day}
            />
        )
    }


    const nextWeek = () => {
        setWeek(week + 1)
    }
    const prewWeek = () => { 
        setWeek(week - 1)
    }

    
    let direction = prevWeek.current < week ? 1 : -1

    prevWeek.current = week

    return (
        <Wraper>

            <Header
                week={week}
                prewWeek={prewWeek}
                nextWeek={nextWeek}
            />
           
            <div className="week-wrapper">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div 
                        className="week-grid" 
                        key={week}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", duration: 0.38, bounce: 0.15, ease: "easeOut" },
                        }}
                        
                    >
                        { days.length != 0 ? 
                            days : 
                            <div className="no-timetable-alert content-card">Тут каникулы)</div>
                        }
                    </motion.div>
                </AnimatePresence>
             </div>
        </Wraper>
    )
}


export default memo(Week)