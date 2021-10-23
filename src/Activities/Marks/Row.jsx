import React, { useRef, useState, useEffect, memo, useContext } from "react"
import PropTypes from "prop-types"

import { setDoc } from "firebase/firestore"
import { ConfigContext } from "../../Context"

import EditableField from "../../Components/EditableField"



const SubjectRow = ({ subject, marksDefault }) => {

    const database = useContext(ConfigContext).database

    const marksInput = useRef(null)
    const [marks, setMarks] = useState(marksDefault)

    useEffect(() => {
        setMarks(marksDefault)
    }, [marksDefault])


    let sum = 0
    let length = 0
    let average = null

    if (marks) {
        const marks_list = marks.split(",")

        marks_list.map((mark) => {
            let int = parseInt(mark)
    
            if (!int) return
    
            sum += int
            length++
        })
    
        average = sum / length
    
        if (!isNaN(average) && average <= 10) {
            average = Number(average.toFixed(1))
        } else {
            average = null
        }
    }


    function createPattern() {
        marksInput.current.focus()

        if (marks.trim().slice(-1) != "," && marks != "") {
            setMarks(marks + ", ")
        }
    }

    function saveMarks() {
        setDoc(database.marks, {
            [subject.id]: marks
        }, { merge: true })
    }

    function handleChange(value) {
        setMarks(value)
    }


    return (
        <div className="flexRow">
            <div className="rowBlock medium colored" style={{ backgroundColor: subject.color }}>{subject.title}</div>
            <div className="rowBlock mainField">
                <EditableField ref={marksInput} value={marks} onChange={handleChange} onSave={saveMarks}/>
            </div>
            { marks && average && <div className="rowBlock square">{average}</div> }
            <div className="rowBlock square" onClick={createPattern}><i className="fas fa-plus"></i></div>
        </div>
    )
}


SubjectRow.propTypes = {
    subject: PropTypes.object,
    marksDefault: PropTypes.string
}


export default memo(SubjectRow)