import { css } from '@linaria/core'
import React, { useState, memo } from 'react'

import { InputModal } from '../../../Components/InputModal'
import Link from '../../TimeTable/DayCard/SubjectRow/Link'

const styles = css`
    display: flex;
    gap: 6px;
    .homework {
        min-height: 40px;
        max-height: 160px;
        overflow-x: auto;
        background-color: var(--bg3);
        box-shadow: 0 0 0 0.8px var(--lvl4-borders) inset;
        border-radius: 7px;
        padding: 10px;
        font-size: 18px;
        font-weight: 600;
        flex-grow: 1;

        &::-webkit-scrollbar {
            height: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--bg4);
            border-radius: 10px;
        }
    }

    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px;
        background: var(--bg3);
        border-radius: 7px;
    }
`

const Homework = ({ lesson, path }) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <>
            <div className={styles}>
                <div className="homework" onClick={() => setIsEditing(true)}>
                    {lesson.hw}
                </div>
                {lesson.link && (
                    <div className="link">
                        <Link URL={lesson.link} />
                    </div>
                )}
            </div>
            {isEditing && (
                <InputModal
                    handleClose={() => setIsEditing(false)}
                    path={path}
                    lesson={lesson}
                />
            )}
        </>
    )
}

export default memo(Homework)
