import React, { useContext } from "react"
import PropTypes from "prop-types"

import AdaptivePanel from "../../../../Components/AdaptivePanel"
import H1 from "../../../../Components/Typography/H1"
import Switch from "Components/Blocks/Switch"
import VerticalLayout from "../../../../Components/Layouts/VerticalLayout"

import SubjectMarks from "Activities/Marks/QuarterMarks/SubjectMarks"
import "./style.scss"
import { MarksContext } from "../../../../Context"



const LessonInfo = (props) => {
    const marks = useContext(MarksContext)?.[props.lesson.id] ?? []


    return (
        <AdaptivePanel handleClose={props.handleClose}>
            <VerticalLayout>
                <H1 text={props.subject.full_title || props.subject.title}/>


                <div className="lesson-info-block">
                    <div className="title">Домашнее</div>
                    <div className="homework-view">{ props.lesson.hw }</div>
                    { props.lesson.changedBy && <div className="last-changes-by">Записал: { props.lesson.changedBy }</div> }
                </div>

                { props.subject.marks && <div className="lesson-info-block">
                    <div className="title">Мои оценки</div>
                    <div className="marks-list">
                        <SubjectMarks marks={marks} subject={props.subject} embedded/>
                    </div>
                </div> }

                <Switch checked={ props.lesson.danger } onChange={props.handleDangerChange} title="Здесь что-то страшное" icon={ <i className="fas fa-skull-crossbones"></i> } descr="Отметить, что на этом уроке к/р или что-то еще"></Switch>

            </VerticalLayout>
        </AdaptivePanel>
    )
}


LessonInfo.propTypes = {
    lesson: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    subject: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
}


export default LessonInfo
