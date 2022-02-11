import { useContext } from 'react'
import { css } from '@linaria/core'

import { manifestContext } from '../../../Context'
import SubjectMarks from './SubjectMarks'

import Average from './Average'

const styles = css`
    @media (min-width: 750px) {
        padding: 8px 10px;
    }

    .grid {
        display: grid;
        grid-auto-flow: row;
        row-gap: 8px;

        @media (min-width: 750px) {
            column-gap: 12px;
            grid-auto-flow: column;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(8, auto);
            row-gap: 12px;
        }
    }

    @media (max-width: 600px) {
        padding: 12px;
        padding-top: 6px;
    }

    @media (max-width: 360px) {
        padding: 0;
        padding-top: 4px;
    }
`

const MarksView = ({ marks, readOnly }) => {
    const manifest = useContext(manifestContext)

    const rows = []

    for (let subjID in manifest) {
        const subject = manifest[subjID]

        if (subject.marks) {
            const target = marks['marksTargets']?.[subjID]

            rows.push(
                <SubjectMarks
                    readOnly={readOnly}
                    target={target}
                    key={subjID}
                    subject={subject}
                    marks={marks[subjID] ?? []}
                />
            )
        }
    }

    return (
        <div className={styles}>
            <div className="grid">{rows}</div>
            <Average marks={marks} />
        </div>
    )
}

export default MarksView
