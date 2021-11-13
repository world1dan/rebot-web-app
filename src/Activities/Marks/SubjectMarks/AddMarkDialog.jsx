import React, { useContext } from "react"
import PropTypes from "prop-types"

import { setDoc, arrayUnion } from "@firebase/firestore"

import { ConfigContext } from "../../../Context"

import MarksInput from "../MarksInput"
import { ActionSheetContext } from "Components/ActionSheet"

import "./style.scss"



const AddMarkDialog = (props) => {

    const { close } = useContext(ActionSheetContext)

    const context = useContext(ConfigContext)
    const marksDoc = context.database.marks
    


    const handleMarkInput = (mark) => {
        close()

        setDoc(marksDoc, {
            [props.subjectInfo.id]: arrayUnion({ 
                mark,
                time: Date.now()
            })
        }, { merge: true })

        context.setStatusBar({
            title: 'Оценка добавлена',
            type: "sucsess"
        })
    }



    return (
        <div className="AddMarkDialog">
            <header className="mark-info">
                <h5 className="title">Нажми на оценку чтобы добавить</h5>
                <div className="subject">{ props.subjectInfo?.full_title || props.subjectInfo?.title }</div>
            </header>
            <MarksInput handleMarkInput={ handleMarkInput }/>
        </div>
    )
}




AddMarkDialog.propTypes = {
    subjectInfo: PropTypes.object.isRequired
}



export default AddMarkDialog