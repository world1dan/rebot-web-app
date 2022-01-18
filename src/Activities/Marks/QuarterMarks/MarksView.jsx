import React, { useContext, memo } from "react"
import PropTypes from "prop-types"

import { manifestContext } from "../../../Context"
import SubjectMarks from "./SubjectMarks"

import Average from "./Average"

import "./style.scss"


const MarksView = (props) => {
    const manifest = useContext(manifestContext)

    const rows = []

    for (let subjID in manifest) {
        const subject = manifest[subjID]
        subject.id = subjID

        const target = props.marks['marksTargets']?.[subjID]

        if (subject.marks) {
            rows.push(<SubjectMarks readOnly={props.readOnly} target={target} key={subjID} subject={subject} marks={ props.marks[subjID] ?? [] }/>)
        }
    }

    return (
        <div className="MarksView">
            <div className="grid">
                { rows }
            </div>
                <Average marks={props.marks} />
        </div>

    )
}



MarksView.propTypes = {
    marks: PropTypes.object.isRequired,
    readOnly: PropTypes.bool
}



export default memo(MarksView)