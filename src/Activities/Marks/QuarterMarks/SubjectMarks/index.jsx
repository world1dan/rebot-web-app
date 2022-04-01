import { useState, memo } from 'react'
import { SubjectMarkContext } from './SubjectMarksContext'

import MarksKeyboard from '../../MarksKeyboard'
import useMarksController from '../../useMarksController'
import ActionSheet from '../../../../Components/ActionSheet'
import Average from './Average'
import MarksList from './MarksList'
import NewMark from './NewMark'
import CalendarView from './CalendarView'

import './style.scss'

const SubjectMarks = ({ subject, marks, target, embedded, readOnly }) => {
    const [targetDialog, setTargetDialog] = useState(false)

    const { changeMarkTarget, addQuarterMark } = useMarksController(subject)

    const openTargetDialog = () => setTargetDialog(true)
    const closeTargetDialog = () => setTargetDialog(false)

    return (
        <SubjectMarkContext.Provider value={{ marks, subject, readOnly }}>
            <div className={'SubjectMarks' + (embedded ? ' embedded' : '')}>
                {!embedded && (
                    <div
                        className="color-indicator"
                        style={{
                            backgroundColor: subject.color,
                            boxShadow: '0px 0px 4px ' + subject.color,
                        }}
                    />
                )}

                <div className="main-content">
                    {!embedded && (
                        <h5 className="subject-title">
                            {subject.full_title || subject.title}
                        </h5>
                    )}

                    <div className="marks-container">
                        <MarksList marks={marks} />
                        {!readOnly && (
                            <NewMark
                                subject={subject}
                                layoutDependency={marks?.length}
                                addQuarterMark={addQuarterMark}
                            />
                        )}
                    </div>
                    <CalendarView marks={marks} subject={subject} />
                </div>

                <Average
                    marks={marks}
                    target={target}
                    readOnly={readOnly}
                    openTargetDialog={openTargetDialog}
                />
            </div>
            {!readOnly && targetDialog && (
                <ActionSheet bottomCloseBtn onClose={closeTargetDialog}>
                    <MarksKeyboard
                        onSubmit={changeMarkTarget}
                        title="Выбери цель для этого предмета"
                        descr={subject.full_title ?? subject.title}
                        statusBarAlert="Цель установлена"
                    />
                </ActionSheet>
            )}
        </SubjectMarkContext.Provider>
    )
}

export default memo(SubjectMarks, (prewProps, nextProps) => {
    if (
        JSON.stringify(prewProps?.marks) == JSON.stringify(nextProps?.marks) &&
        prewProps?.target == nextProps?.target
    ) {
        return true
    } else {
        return false
    }
})
