import React, { useEffect, useContext, useState, memo } from "react"
import PropTypes from "prop-types"

import { ConfigContext, manifestContext } from "../../../../Context"
import { useTimetableUpdate } from "../../../../Hooks/useTimetableUpdate"
import { showAlert } from "../../../../Helpers/showAlert"


import EditableField from "../../../../Components/EditableField"
import HomeworkRe from "../../../HomeworkRe"
import LessonInfo from "./LessonInfo"
import ContextMenu from "../../../../Components/ContextMenu"
import ContextMenuBtn from "../../../../Components/ContextMenu/ContextMenuBtn"

import "./style.scss"




const SubjectRow = ({ lesson, path }) => {
    const update = useTimetableUpdate()
    const user = useContext(ConfigContext).user
    const subject = useContext(manifestContext)?.[lesson.id]

    const [homework, setHomework] = useState(lesson.hw)
    const [instant, setInstant] = useState(false)
    const [info, setInfo] = useState(false)

    useEffect(() => {
        setHomework(lesson.hw)
    }, [lesson.hw])

    const title = subject?.title ??  <i className="fas fa-circle-notch fa-spin"></i>
    const style = {
        backgroundColor: subject?.color ?? "var(--bg3)"
    }


    const saveHomework = () => {
        if (homework !== lesson.hw) {
            update({
                [path + ".hw"]: homework,
                [path + ".changedBy"]: user.first_name,
            })
        }
    }

    const openInstant = () => {
        setInstant(true)
    }

    const closeInstant = () => {
        setInstant(false)
    }

    const openInfo = () => {
        setInfo(true)
    }

    const closeInfo = () => {
        setInfo(false)
    }

    const copy = () => {
        try {
            navigator.clipboard.writeText(homework).then(() => {
                showAlert("Скопировано")
            })
        } catch {
            showAlert("Ошибка")
        }
    } 
    

    return (
        <div className="flexRow">
            <div className="rowBlock medium colored" style={style}>{title}</div>
            <div className="rowBlock mainField">
                <EditableField value={homework ?? ""} onChange={setHomework} onSave={saveHomework}/>
            </div>
            <div className="rowBlock square">
                <ContextMenu>
                    { subject?.url && homework &&
                    <ContextMenuBtn
                        onClick={openInstant}
                        title="Решение"
                        icon={ <i className="fas fa-book"></i> }
                    /> }
                    <ContextMenuBtn
                        onClick={copy}
                        title="Скопировать"
                        icon={ <i className="fas fa-clone"></i> }
                    />
                    <ContextMenuBtn
                        onClick={openInfo}
                        title="Об Уроке"
                        icon={ <i className="fas fa-info"></i> }
                    />
                </ContextMenu>
                { instant && <HomeworkRe lessonsData={[lesson]} handleClose={closeInstant}/> }
                { info && <LessonInfo lesson={lesson} subject={subject} handleClose={closeInfo}/> }
            </div>
        </div>
    )
    
}



SubjectRow.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.string,
        hw: PropTypes.string
    }).isRequired,

    path: PropTypes.string.isRequired
}


export default memo(SubjectRow)