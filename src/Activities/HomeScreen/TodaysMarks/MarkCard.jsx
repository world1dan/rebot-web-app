import { useContext } from 'react'
import { css } from '@linaria/core'

import { manifestContext } from '../../../Context'
import Mark from '../../Marks/Mark'
import { SubjectMarkContext } from '../../Marks/QuarterMarks/SubjectMarks/SubjectMarksContext'

import { motion } from 'framer-motion'

const styles = css`
    background: var(--bg3);
    border-radius: 14px;
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
    padding: 6px;
    max-width: 150px;
    width: 100%;
    justify-content: space-between;

    .subject-title {
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        padding: 4px 14px;
    }
`

const MarkCard = ({ mark, subjectMarksList }) => {
    const subjectsManifest = useContext(manifestContext)

    const subject = subjectsManifest[mark.subjID]

    return (
        <motion.div
            layout="position"
            initial={{ opacity: 0, scale: 0.85 }}
            exit={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles}
            style={{
                border: `1.5px solid ${subject.color}`,
            }}
        >
            <SubjectMarkContext.Provider
                value={{
                    subject,
                    marks: subjectMarksList,
                }}
            >
                <Mark mark={mark.originalMark} />
            </SubjectMarkContext.Provider>
            <div className="subject-title">{subject.title}</div>
        </motion.div>
    )
}

export default MarkCard
