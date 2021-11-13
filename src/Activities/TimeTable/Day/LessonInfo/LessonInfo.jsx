import React, { useContext } from "react"
import PropTypes from "prop-types"

import AdaptivePanel from "../../../../Components/AdaptivePanel"
import H1 from "../../../../Components/Typography/H1"
import Switch from "Components/Blocks/Switch"
import VerticalLayout from "../../../../Components/Layouts/VerticalLayout"

import SubjectMarks from "Activities/Marks/SubjectMarks"
import "./style.scss"
import { MarksContext } from "../../../../Context"



const LessonInfo = (props) => {
    const marks = useContext(MarksContext)?.[props.lesson.id] ?? []

    const handleDangerChange = (e) => {

        props.update({
            [props.path + ".danger"]: e.target.checked
        })
    }

    


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

                <Switch checked={ props.lesson.danger } onChange={handleDangerChange} title="Здесь что-то страшное" icon={ <i className="fas fa-skull-crossbones"></i> } descr="Отметить, что на этом уроке к/р или что-то еще"></Switch>

            </VerticalLayout>
        </AdaptivePanel>
    )
}


LessonInfo.propTypes = {

}


export default LessonInfo
