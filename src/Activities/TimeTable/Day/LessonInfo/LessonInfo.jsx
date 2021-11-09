import React, { useContext } from "react"
import PropTypes from "prop-types"

import AdaptivePanel from "../../../../Components/AdaptivePanel"
import H1 from "../../../../Components/Typography/H1"
import HSplitter from "../../../../Components/Typography/HSplitter"
import VerticalLayout from "../../../../Components/Layouts/VerticalLayout"
import TableList from "../../../../Components/Typography/TableList"
import SubjectMarks from "Activities/Marks/SubjectMarks"
import "./style.scss"
import { MarksContext } from "../../../../Context"



const LessonInfo = (props) => {
    const marks = useContext(MarksContext)?.[props.lesson.id] ?? []


    return (
        <AdaptivePanel handleClose={props.handleClose}>
            <VerticalLayout>
                <H1 text={props.subject.title}/>


                <div className="lesson-info-block">
                    <div className="title">Домашнее</div>
                    <div className="homework-view">{ props.lesson.hw }</div>
                    { props.lesson.changedBy && <div className="last-changes-by">Записал: { props.lesson.changedBy }</div> }
                </div>

                <div className="lesson-info-block">
                    <div className="title">Мои оценки</div>
                    <div className="marks">
                        <SubjectMarks marks={marks} subject={props.subject} embedded/>
                    </div>
                </div>

            </VerticalLayout>
        </AdaptivePanel>
    )
}


LessonInfo.propTypes = {

}


export default LessonInfo
