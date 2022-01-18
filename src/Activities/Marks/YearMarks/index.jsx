import React, { useContext, useEffect, useState } from "react"

import { ConfigContext, manifestContext } from "../../../Context"
import useFirestoreListener from "Hooks/useFirestoreListener"

import YearSubjectMarks from "./YearSubjectMarks"
import Average from "./Average"
import Loading from "Components/Loading"


const YearMarks = () => {
    const manifest = useContext(manifestContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 250)
    })
    const yearMarksDoc = useContext(ConfigContext).database.yearMarks
    const marks = useFirestoreListener(yearMarksDoc)

    const rows = []

    for (let subjID in manifest) {
        const subject = manifest[subjID]
        subject.id = subjID

        if (subject.marks) {
            rows.push(<YearSubjectMarks key={subjID} subject={subject} marks={marks?.[subjID] ?? {}}/>)
        }
    }


    return (
        <div className="YearMarks">
            { loading ? <Loading/> :
                <>
                    <header className="YearMarks-table-header">
                        <div className="subject">Предмет</div>
                        <div>I</div>
                        <div>II</div>
                        <div>III</div>
                        <div>IV</div>
                        <div className="year">Год</div>
                    </header>
                        { rows }
                    { marks && <Average marks={marks}/> }
                </> }
        </div>
    )
}



export default YearMarks