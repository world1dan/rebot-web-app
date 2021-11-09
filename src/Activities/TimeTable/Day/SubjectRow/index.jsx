import React, { useEffect, useContext, useState, memo } from "react"
import PropTypes from "prop-types"

import { ConfigContext, manifestContext } from "../../../../Context"
import { useTimetableUpdate } from "../../../../Hooks/useTimetableUpdate"
import { showAlert } from "../../../../Helpers/showAlert"


import EditableField from "../../../../Components/EditableField"
import HomeworkRe from "../../../HomeworkRe"
import LessonInfo from "../LessonInfo/LessonInfo"
import ContextMenu from "../../../../Components/ContextMenu"
import ContextMenuBtn from "../../../../Components/ContextMenu/ContextMenuBtn"
import AddMarkDialog from "../../../Marks/SubjectMarks/AddMarkDialog"
import ActionSheet from "Components/ActionSheet"


import "./style.scss"




const SubjectRow = ({ lesson, path }) => {
    const update = useTimetableUpdate()
    const user = useContext(ConfigContext).user
    const manifest = useContext(manifestContext)
    const subject = manifest?.[lesson.id]

    const [homework, setHomework] = useState(lesson.hw)
    const [instant, setInstant] = useState(false)
    const [addMarkDialog, setAddMarkDialog] = useState(false) 
    const [info, setInfo] = useState(false)

    const isMath = lesson.id === "alg" || lesson.id === "geom"


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
                        icon={ <i className="fas fa-book fa-xl"></i> }
                    /> }
                    { (subject?.marks || isMath) && <ContextMenuBtn
                        onClick={() => setAddMarkDialog(true)}
                        title="Новая оценка"
                        icon={ <svg width="18" height="18" viewBox="0 0 19 19" fill="currentColor"><path d="M9.49165 18.4297C14.2259 18.4297 18.1335 14.3164 18.1335 9.3418C18.1335 4.36719 14.2175 0.253906 9.4833 0.253906C4.75742 0.253906 0.858154 4.36719 0.858154 9.3418C0.858154 14.3164 4.76577 18.4297 9.49165 18.4297ZM5.45043 9.35059C5.45043 8.83203 5.80113 8.47168 6.2854 8.47168H8.66503V5.9668C8.66503 5.45703 8.99903 5.09668 9.47495 5.09668C9.96759 5.09668 10.3099 5.45703 10.3099 5.9668V8.47168H12.6979C13.1738 8.47168 13.5245 8.83203 13.5245 9.35059C13.5245 9.8516 13.1738 10.2119 12.6979 10.2119H10.3099V12.7168C10.3099 13.2178 9.96759 13.5869 9.47495 13.5869C8.99903 13.5869 8.66503 13.2178 8.66503 12.7168V10.2119H6.2854C5.80113 10.2119 5.45043 9.8516 5.45043 9.35059Z"/></svg> }
                    /> }
                    <ContextMenuBtn
                        onClick={openInfo}
                        title="Об Уроке"
                        icon={ <i className="fas fa-info-circle fa-xl"></i> }
                    />
                </ContextMenu>
                { instant && <HomeworkRe lessonsData={[lesson]} handleClose={closeInstant}/> }
                { info && <LessonInfo lesson={isMath ? {...lesson, id: "math"} : lesson} subject={isMath ? manifest["math"] : subject} handleClose={closeInfo}/> }
                { addMarkDialog &&
                    <ActionSheet onClose={() => setAddMarkDialog(false)} >
                        <AddMarkDialog subjectInfo={isMath ? manifest["math"] : subject}/>
                    </ActionSheet>
                }
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