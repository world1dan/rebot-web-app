import { css } from '@linaria/core'
import { FC, useContext } from 'react'

import { manifestContext } from '../../../../Context'
import { ILesson } from '../../../../types'

import Homework from './Homework'
import ImportantLessonAlert from './ImportantLessonAlert'
import SubjectName from './SubjectName'
import Tools from './Tools'

const styles = css`
    display: grid;
    grid-template-columns: 86px auto 38px;
    gap: 5px;

    @media (min-width: 600px) {
        grid-template-columns: 94px auto 38px;
    }

    @media (max-width: 350px) {
        grid-template-columns: 76px auto 36px;
    }

    > div {
        border-radius: 5px;
        background-color: var(--bg3);
    }

    &.important-lesson {
        > div {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }
    }

    &:last-child > div:first-of-type {
        border-radius: 5px 5px 5px 9px;
    }

    &:last-child > div:last-of-type {
        border-radius: 5px 5px 9px;
    }

    &.share-mode {
        grid-template-columns: 86px auto;
        &:last-child > div:last-of-type,
        &:last-child > div:first-of-type {
            border-radius: 5px;
        }
    }
`

export interface ILessonProps {
    lesson: ILesson
    path: string
    shareMode?: boolean
}

const Lesson: FC<ILessonProps> = ({ lesson, path, shareMode = false }) => {
    const manifest = useContext(manifestContext)
    const subject = manifest?.[lesson.id]

    if (!subject) return null

    return (
        <>
            {lesson.danger && <ImportantLessonAlert subject={subject} />}
            <div
                className={
                    styles +
                    (lesson.danger ? ' important-lesson' : '') +
                    (shareMode ? ' share-mode' : '')
                }
            >
                <SubjectName subject={subject} />
                <Homework lesson={lesson} path={path} shareMode={shareMode} />
                {!shareMode && <Tools subject={subject} lesson={lesson} path={path} />}
            </div>
        </>
    )
}

export default Lesson
