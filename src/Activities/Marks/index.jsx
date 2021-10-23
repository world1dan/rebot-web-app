import React, { useContext, memo } from "react"

import { ConfigContext, manifestContext } from "../../Context"
import Row from "./Row"

import useFirestoreListener from "../../Hooks/useFirestoreListener"
import Wraper from "../../Components/Wraper"

import "./style.scss"



const Marks = () => {
    const database = useContext(ConfigContext).database
    const manifest = useContext(manifestContext)

    let marks = useFirestoreListener(database.marks)
    
    if (marks) {
        marks = Object.fromEntries(Object.entries(marks).sort())
    }

    const rows = []

    for (let subjID in manifest) {
        const subject = manifest[subjID]
        subject.id = subjID

        if (subject.marks) {
            rows.push(<Row key={subjID} subject={subject} marksDefault={marks && marks[subjID] ? marks[subjID] : ""}/>)
        }
    }

    return (
        <Wraper>
            <div className="content-card">
                <header className="day-header">
                    <div className="day-title">Оценки</div>
                </header>
                <div className="marks-grid">
                    { rows }
                </div>
                <div className="info" style={{marginTop: 10}}>Нужно разделять запятой, справа - средний балл</div>
            </div>
        </Wraper>
    )
}



export default memo(Marks)