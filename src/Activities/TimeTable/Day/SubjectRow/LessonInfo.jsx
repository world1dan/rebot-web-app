import React from "react"
import PropTypes from "prop-types"

import AdaptivePanel from "../../../../Components/AdaptivePanel"
import H1 from "../../../../Components/Typography/H1"
import HSplitter from "../../../../Components/Typography/HSplitter"
import VerticalLayout from "../../../../Components/Layouts/VerticalLayout"
import TableList from "../../../../Components/Typography/TableList"
const LessonInfo = (props) => {
    return (
        <AdaptivePanel handleClose={props.handleClose}>
            <VerticalLayout>
                <H1 text={props.subject.title}/>

                <TableList listItems={[
                    {
                        title: "Домашнее",
                        content: props.lesson.hw
                    },
                    {
                        title: "Последнее изменение",
                        content: props.lesson.changedBy ?? "хз кто"
                    }
                ]}/>
            </VerticalLayout>
        </AdaptivePanel>
    )
}


LessonInfo.propTypes = {

}


export default LessonInfo
