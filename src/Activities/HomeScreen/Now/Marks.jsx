import { css } from '@linaria/core'
import { useContext, memo } from 'react'

import { MarksContext } from '../../../Context'
import SubjectMarks from '../../Marks/QuarterMarks/SubjectMarks'

const styles = css`
    position: relative;

    .SubjectMarks {
        min-height: auto;
    }

    .average-mark {
        border-radius: 7px !important;
    }

    .main-content {
        padding-bottom: 3px;
        padding-left: 3px;
    }

    .marks-container {
        margin-top: 26px;
    }

    .block-title {
        position: absolute;
        top: 6px;
    }
`

const Marks = ({ subject }) => {
    const marks = useContext(MarksContext)

    return (
        <div className={styles}>
            <h5 className="block-title">МОИ ОЦЕНКИ</h5>
            <SubjectMarks
                marks={marks?.[subject.id] ?? []}
                subject={subject}
                target={marks?.['marksTargets']?.[subject.id]}
                embedded
            />
        </div>
    )
}

export default memo(Marks)
