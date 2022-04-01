import { css } from '@linaria/core'
import { useContext, useState } from 'react'

import { manifestContext } from '../../../../Context'
import Homework from './components/Homework'
import ImportantLessonAlert from './components/ImportantLessonAlert'
import SubjectTitle from './components/SubjectTitle'
import Tools from './components/Tools'

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
            border-radius: 0 0 5px 5px;
        }
    }

    &:last-child > div:first-of-type {
        border-radius: 5px 5px 5px 9px;
    }

    &:last-child > div:last-of-type {
        border-radius: 5px 5px 9px;
    }
`

const Lesson = ({ lesson, path }) => {
    const manifest = useContext(manifestContext)
    const subject = manifest?.[lesson.id] ?? {}

    return (
        <>
            {lesson.danger && <ImportantLessonAlert subject={subject} />}
            <div className={styles + (lesson.danger ? ' important-lesson' : '')}>
                <SubjectTitle subject={subject} />
                <Homework lesson={lesson} path={path} />
                <Tools subject={subject} lesson={lesson} path={path} />
            </div>
        </>
    )
}

export default Lesson
