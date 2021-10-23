import React, { useContext, useState } from "react"
import PropTypes from "prop-types"

import { ConfigContext } from "../../../Context"

import { showAlert } from "../../../Helpers/showAlert"

import HomeworkRe from "../../HomeworkRe"
import SubjectRow from "./SubjectRow"

import "./style.scss"


const day_titles = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    7: "Воскресенье"
}


const Day = ({ dayNum, week, timetable, pathToDay }) => {

    const [instant, setInstant] = useState(false)
    const group = useContext(ConfigContext).user.group


    

    const date = new Date()
    const weekDay = date.getDay()


    let mult = 0

    if (week == 1) {
        mult = -7
    } else if (week == 3) {
        mult = 7
    }

    const distance = dayNum + mult - (weekDay != 0 ? weekDay : 7)



    date.setDate(date.getDate() + distance)
    const dateTitle = date.toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" })

    const lessons = []

    for (let lessonNum in timetable) {
        const lessonInfo = timetable[lessonNum]

        let lesson, path

        if (lessonInfo.groups) {
            if (lessonInfo[group]) {
                lesson = lessonInfo[group]
                path = `${pathToDay}.${lessonNum}.${group}`
            } else break
        } else {
            lesson = lessonInfo
            path = `${pathToDay}.${lessonNum}`
        }

        lessons.push(<SubjectRow key={lessonNum} path={path} lesson={lesson}/>)
    }




    const openInstant = () => {
        const toOpen = []

        for (let lessonNum in timetable) {
            const lessonInfo = timetable[lessonNum]

            if (lessonInfo.groups) {
                if (lessonInfo[group]) {
                    let lesson = lessonInfo[group]
                    lesson.hw && toOpen.push(lesson)
                }
            } else {
                lessonInfo.hw && toOpen.push(lessonInfo)
            }
        }

        if (toOpen.length != 0) {
            setInstant(toOpen)
        } else {
            showAlert("Решебники не найдены")
        }
    }


    return (
        <div className="content-card">
            { instant && <HomeworkRe lessonsData={instant} handleClose={() => setInstant(false)}/> }

            <header className="day-header">
                <div className="day-title">{ day_titles[dayNum] }</div>
                <div className="day-date">{ dateTitle }</div>
            </header>

            <button className="table-btn tool" onClick={openInstant}><i className="fas fa-book fa-lg"></i></button>

            <div className="content">
                { lessons }
            </div>
        </div>
    )

}


Day.propTypes = {
    dayNum: PropTypes.number.isRequired,
    week: PropTypes.number.isRequired,
    timetable: PropTypes.object.isRequired,
    pathToDay: PropTypes.string.isRequired,
    afterTitle: PropTypes.string
}

export default Day