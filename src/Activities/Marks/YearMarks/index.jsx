import { useContext } from 'react'

import { manifestContext } from '../../../Context'
import useFirestoreListener from '../../../Hooks/useFirestoreListener'

import YearSubjectMarks from './YearSubjectMarks'
import Average from './Average'
import Suspense from '../../../Components/Suspense'

import './style.scss'

const YearMarks = ({ yearMarksDoc, readOnly }) => {
    const manifest = useContext(manifestContext)

    const marks = useFirestoreListener(yearMarksDoc)

    const rows = []

    for (let subjID in manifest) {
        const subject = manifest[subjID]
        subject.id = subjID

        if (subject.marks) {
            rows.push(
                <YearSubjectMarks
                    key={subjID}
                    readOnly={readOnly}
                    subject={subject}
                    marks={marks?.[subjID] ?? {}}
                />
            )
        }
    }

    return (
        <div className="YearMarks">
            <Suspense delay={330} rowsCount={16}>
                <header className="YearMarks-table-header">
                    <span className="subject">Предмет</span>
                    <span>I</span>
                    <span>II</span>
                    <span>III</span>
                    <span>IV</span>
                    <span className="year">Год</span>
                </header>
                {rows}

                {marks && <Average marks={marks} />}
            </Suspense>
        </div>
    )
}

export default YearMarks
