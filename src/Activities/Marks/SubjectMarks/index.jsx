import React, { useState, memo, useContext } from "react"
import PropTypes from "prop-types"

import { setDoc, arrayRemove } from "firebase/firestore"

import { ConfigContext } from "../../../Context"

import Mark from "./Mark"
import AdaptivePanel from "Components/AdaptivePanel"
import MarksCalculator from "../MarksCalculator"
import ActionSheet from "Components/ActionSheet"
import AddMarkDialog from "./AddMarkDialog"

import "./style.scss"



const SubjectMarks = ({ subject, marks, embedded }) => {

    const [calculator, setCalculator] = useState(false)
    const [addDialog, setAddDialog] = useState(false)

    const marksDoc = useContext(ConfigContext).database.marks


    const removeMark = (mark) => {
        if (confirm(`Удалить оценку (${mark.mark}) ?`)) {
            setDoc(marksDoc, {
                [subject.id]: arrayRemove(mark)
            }, { merge: true })
        }
    }


    let sum = 0

    const marksComponents = marks.map((mark) => {
        sum += mark.mark

        return (
            <Mark mark={mark} key={mark.time} removeMark={removeMark}/>
        )
    })


    let average = sum / marks.length

    if (!isNaN(average) && average <= 10) {
        average = Number(average.toFixed(2))
    } else {
        average = null
    }



    return (
        <>
            <div className={"SubjectMarks" + (embedded ? " embedded" : "")}>
                { !embedded && <div className="color-indicator" style={{ backgroundColor: subject.color, boxShadow: "0px 0px 4px " + subject.color }}></div> }

                <div className="main-content">
                    { !embedded && <h5 className="subject-title">{ subject.full_title || subject.title }</h5> }
                    <div className="marks-container">
                        { marksComponents }

                        <div className="Mark" onClick={() => setAddDialog(true)}>
                            <svg width="18" height="18" viewBox="0 0 19 19" fill="currentColor"><path d="M9.49165 18.4297C14.2259 18.4297 18.1335 14.3164 18.1335 9.3418C18.1335 4.36719 14.2175 0.253906 9.4833 0.253906C4.75742 0.253906 0.858154 4.36719 0.858154 9.3418C0.858154 14.3164 4.76577 18.4297 9.49165 18.4297ZM5.45043 9.35059C5.45043 8.83203 5.80113 8.47168 6.2854 8.47168H8.66503V5.9668C8.66503 5.45703 8.99903 5.09668 9.47495 5.09668C9.96759 5.09668 10.3099 5.45703 10.3099 5.9668V8.47168H12.6979C13.1738 8.47168 13.5245 8.83203 13.5245 9.35059C13.5245 9.8516 13.1738 10.2119 12.6979 10.2119H10.3099V12.7168C10.3099 13.2178 9.96759 13.5869 9.47495 13.5869C8.99903 13.5869 8.66503 13.2178 8.66503 12.7168V10.2119H6.2854C5.80113 10.2119 5.45043 9.8516 5.45043 9.35059Z"/></svg>
                        </div>
                    </div>
                </div>

                { marks && average && 
                    <div className="average-mark" onClick={() => setCalculator(true)}>
                        {average}
                    </div>
                }
                
            </div>

            { addDialog &&
                    <ActionSheet onClose={() => setAddDialog(false)} >
                        <AddMarkDialog subjectInfo={subject}/>
                    </ActionSheet>
            }

            { calculator && 
                <AdaptivePanel handleClose={() => setCalculator(false)} direction="right" headerTitle="Калькулятор">
                    <MarksCalculator realMarks={marks}/>
                </AdaptivePanel>
            }
        </>
    )
}




SubjectMarks.propTypes = {
    subject: PropTypes.object.isRequired,
    marks: PropTypes.array.isRequired,
}



export default memo(SubjectMarks, (prewProps, nextProps) => {
    if (prewProps?.marks?.length == nextProps?.marks?.length) {
        return true
    } else {
        return false
    }
})



/*

<div className="Mark" onClick={() => setCalculator(true)}>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="currentColor"><g clipPath="url(#clip0_114:117)"><path d="M8.64062 9.1636L13.0703 2.22335C13.1875 2.04136 13.2422 1.88419 13.2422 1.69394C13.2422 1.30515 12.9297 1.01562 12.5547 1.01562C12.2266 1.01562 12.0547 1.13143 11.8125 1.50368L7.39844 8.46875L2.9375 15.4339C2.82031 15.6075 2.75781 15.7647 2.75781 15.9797C2.75781 16.3934 3.08594 16.6581 3.47656 16.6581C3.78125 16.6581 3.95313 16.534 4.17969 16.1783L8.64062 9.1636ZM0.523438 5.17647C0.523438 5.55699 0.8125 5.85478 1.16406 5.85478H2.66406V7.44301C2.66406 7.8318 2.96093 8.1296 3.30469 8.12133C3.67188 8.12133 3.95313 7.82353 3.95313 7.44301V5.85478H5.45313C5.8125 5.85478 6.09375 5.55699 6.09375 5.17647C6.09375 4.80422 5.8125 4.49816 5.45313 4.49816H3.95313V2.90165C3.95313 2.52941 3.66406 2.22335 3.30469 2.22335C2.95313 2.22335 2.66406 2.52941 2.66406 2.90165V4.49816H1.16406C0.8125 4.49816 0.523438 4.80422 0.523438 5.17647ZM9.8984 13.0515C9.8984 13.432 10.1875 13.738 10.539 13.738H14.8281C15.1875 13.738 15.4765 13.432 15.4765 13.0515C15.4765 12.6792 15.1875 12.3731 14.8281 12.3731H10.539C10.1875 12.3731 9.8984 12.6792 9.8984 13.0515Z"/></g><defs><clipPath id="clip0_114:117"><rect width="16" height="16" fill="white" transform="translate(0 0.6875)"/></clipPath></defs></svg>
                        </div>*/