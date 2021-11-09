import React, { useContext, memo } from "react"
import PropTypes from "prop-types"

import { manifestContext } from "../../Context"
import SubjectMarks from "./SubjectMarks"



const MarksView = (props) => {
    const manifest = useContext(manifestContext)

    const rows = []

    for (let subjID in manifest) {
        const subject = manifest[subjID]
        subject.id = subjID

        if (subject.marks) {
            rows.push(<SubjectMarks key={subjID} subject={subject} marks={ props.marks[subjID] ?? [] }/>)
        }
    }

    return (
        <div className="marks-grid">
            { rows }
        </div>
    )
}



MarksView.propTypes = {
    marks: PropTypes.object.isRequired
}



export default memo(MarksView)