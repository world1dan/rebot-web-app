// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { css } from '@linaria/core'
import { useContext } from 'react'

import { MarksContext } from '../../../Context'
import { AnimatePresence } from 'framer-motion'
import MarkCard from './MarkCard'

const styles = css`
    display: grid;
    gap: 13px;
    margin-top: 2px;
    margin-bottom: 4px;
    .todays-marks-list {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 6px;
        ::-webkit-scrollbar {
            height: 5px;
            background-color: none;
        }
        ::-webkit-scrollbar-thumb {
            background-color: var(--bg2);
            border-radius: 5px;
        }
    }

    .card-title {
        text-align: center;
        font-size: 13px;
        color: var(--text2);
        font-weight: 600;
    }
`

const TodaysMarks = () => {
    const marks = useContext(MarksContext)

    if (!marks) return null

    const todaysMarksList = []

    try {
        for (let subjID in marks) {
            if (subjID == 'marksTargets') continue
            marks[subjID].forEach((mark) => {
                if (
                    new Date(mark.time).toISOString().split('T')[0] ===
                    new Date().toISOString().split('T')[0]
                ) {
                    todaysMarksList.push({
                        subjectMarksList: marks[subjID],
                        originalMark: mark,
                        subjID: subjID,
                    })
                }
            })
        }
    } catch {
        return null
    }

    return (
        <AnimatePresence initial={false}>
            {todaysMarksList.length > 0 && (
                <div className={styles}>
                    <div className="card-title">Оценки сегодня</div>
                    <div className="todays-marks-list">
                        {todaysMarksList
                            .sort((a, b) =>
                                a.originalMark.time < b.originalMark.time
                                    ? 1
                                    : -1
                            )
                            .map((mark) => (
                                <MarkCard
                                    key={mark.originalMark.time}
                                    mark={mark}
                                    subjectMarksList={mark.subjectMarksList}
                                />
                            ))}
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default TodaysMarks
