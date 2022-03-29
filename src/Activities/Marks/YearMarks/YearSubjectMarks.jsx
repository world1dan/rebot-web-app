import { useState, memo } from 'react'

import Mark from '../Mark'
import ActionSheet from '../../../Components/ActionSheet'
import MarksKeyboard from '../MarksKeyboard'
import PlusRounded from '../../../Components/Icons/PlusRounded'
import useMarksController from '../useMarksController'

import { SubjectMarkContext } from '../QuarterMarks/SubjectMarks/SubjectMarksContext'

import './style.scss'

const YearSubjectMarks = ({ subject, marks, readOnly }) => {
    const [addDialog, setAddDialog] = useState(null)

    const { setYearMark } = useMarksController(subject)

    let sum = 0
    let count = 0

    const quarterMarks = []

    for (let i = 1; i <= 4; i++) {
        const mark = parseInt(marks[i])

        if (mark) {
            sum += mark
            count++
            quarterMarks.push(
                <Mark
                    mark={{ mark }}
                    key={subject.id + i}
                    subject={subject}
                    isYearMark
                    quarter={i}
                    animate
                />
            )
        } else {
            quarterMarks.push(
                <div
                    className="Mark"
                    onClick={!readOnly ? () => setAddDialog(i) : null}
                    key={i}
                >
                    {!readOnly && <PlusRounded width={18} height={18} />}
                </div>
            )
        }
    }

    let average = sum / count

    if (average) {
        average = Math.round(Number(average.toFixed(2)))
    } else {
        average = null
    }

    const handleSubmit = (mark) => setYearMark(mark, addDialog)

    return (
        <>
            <div className="YearSubjectMarks" id={subject.id}>
                <div
                    className="color-indicator"
                    style={{ backgroundColor: subject.color }}
                ></div>

                <h5 className="subject-title">{subject.title}</h5>

                <SubjectMarkContext.Provider value={{ subject, readOnly }}>
                    {quarterMarks}
                </SubjectMarkContext.Provider>

                <div className="year-mark">
                    <Mark mark={{ mark: average }} unclickable />
                </div>
            </div>

            {addDialog && (
                <ActionSheet onClose={() => setAddDialog(false)} bottomCloseBtn>
                    <MarksKeyboard
                        onSubmit={handleSubmit}
                        title={`Нажми чтобы добавить оценку за ${addDialog} четверть`}
                        descr={subject.full_title || subject.title}
                    />
                </ActionSheet>
            )}
        </>
    )
}

export default memo(
    YearSubjectMarks,
    (prevProps, nextProps) =>
        JSON.stringify(prevProps.marks) === JSON.stringify(nextProps.marks)
)
