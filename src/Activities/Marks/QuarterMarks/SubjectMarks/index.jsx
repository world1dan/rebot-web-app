import React, { useState, memo } from "react"
import PropTypes from "prop-types"

import { AnimatePresence } from "framer-motion"

import AdaptivePanel from "Components/AdaptivePanel"
import MarksCalculator from "../Calculator"
import MarksKeyboard from "../../MarksKeyboard"
import useMarksController from "../../useMarksController"
import ActionSheet from "Components/ActionSheet"
import AverageMark from "./AverageMark"
import MarksList from "./MarksList"

import "./style.scss"



const SubjectMarks = ({ subject, marks, target, embedded, readOnly }) => {
    const [calculator, setCalculator] = useState(false)
    const [targetDialog, setTargetDialog] = useState(false)

    const { changeMarkTarget, addQuarterMark } = useMarksController(subject)

    const openCalculator = () => setCalculator(true)
    const closeCalculator = () => setCalculator(false)

    const openTargetDialog = () => setTargetDialog(true)
    const closeTargetDialog = () => setTargetDialog(false)


    return (
        <>
            <div className={"SubjectMarks" + (embedded ? " embedded" : "")}>
                { !embedded && 
                    <div 
                        className="color-indicator" 
                        style={{ backgroundColor: subject.color, boxShadow: "0px 0px 2px " + subject.color }}
                    /> 
                }

                <div className="main-content">
                    { !embedded && <h5 className="subject-title">{ subject.full_title || subject.title }</h5> }

                    <div className="marks-container">
                        <MarksList 
                            marks={marks} 
                            subject={subject} 
                            readOnly={readOnly} 
                            addQuarterMark={addQuarterMark}
                        />
                    </div>
                </div>

                <AverageMark 
                    marks={marks} 
                    target={target} 
                    readOnly={readOnly}
                    openCalculator={openCalculator}
                    openTargetDialog={openTargetDialog}
                />
            </div>

            { calculator && 
                <AdaptivePanel 
                    handleClose={closeCalculator} 
                    direction="right" 
                    headerTitle="Калькулятор"
                >
                    <MarksCalculator marks={marks}/>
                </AdaptivePanel>
            }

            { !readOnly && <AnimatePresence>
                { targetDialog &&
                        <ActionSheet bottomCloseBtn onClose={closeTargetDialog} >
                            <MarksKeyboard
                                onSubmit={changeMarkTarget} 
                                title="Выбери цель для этого предмета" 
                                descr={subject.full_title ?? subject.title}
                                statusBarAlert="Цель установлена"
                            />
                        </ActionSheet>
                }
            </AnimatePresence> }
        </>
    )
}



SubjectMarks.propTypes = {
    subject: PropTypes.object.isRequired,
    marks: PropTypes.array.isRequired,
    embedded: PropTypes.bool,
    target: PropTypes.number,
    readOnly: PropTypes.bool
}



export default memo(SubjectMarks, (prewProps, nextProps) => {
    if (JSON.stringify(prewProps?.marks) == JSON.stringify(nextProps?.marks) && prewProps?.target == nextProps?.target) {
        return true
    } else {
        return false
    }
})