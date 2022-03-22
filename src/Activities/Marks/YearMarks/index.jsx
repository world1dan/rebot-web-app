import { useContext, useEffect, useState } from 'react'

import { manifestContext } from '../../../Context'
import useFirestoreListener from 'Hooks/useFirestoreListener'

import YearSubjectMarks from './YearSubjectMarks'
import Average from './Average'
import Loading from 'Components/Loading'

import './style.scss'

const YearMarks = ({ yearMarksDoc, readOnly }) => {
    const manifest = useContext(manifestContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 220)
    }, [])

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
            {loading ? (
                <Loading />
            ) : (
                <>
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
                </>
            )}
        </div>
    )
}

export default YearMarks
