import { css } from '@linaria/core'
import { useState, memo } from 'react'

import InputModal from '../../../../../Components/InputModal'
import AttachedLink from './AttachedLink'
import AttachedPhoto from './AttachedPhoto'

const styles = css`
    cursor: pointer;

    display: grid;
    justify-content: center;
    align-items: center;

    grid-template-columns: 1fr auto auto;

    font-size: 13px;
    font-weight: 600;
    background-color: var(--bg3);
    border-radius: 5px;

    .text-area {
        padding: 0 8px;
        overflow-x: auto;
        white-space: nowrap;
        height: 100%;
        display: grid;
        place-items: center;

        &::-webkit-scrollbar {
            height: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--bg4);
            border-radius: 10px;
        }
    }

    &.large {
        height: 44px;

        font-size: 15px;
    }
`

const Homework = ({ lesson, path, large }) => {
    const [editor, setEditior] = useState(false)

    return (
        <>
            <div className={styles + (large ? ' large' : '')}>
                <div className="text-area" onClick={() => setEditior(true)}>
                    {lesson.hw}
                </div>

                {lesson.link && <AttachedLink URL={lesson.link} />}
                {lesson.attachments?.length > 0 && (
                    <AttachedPhoto
                        URL={lesson.attachments[0]}
                        lesson={lesson}
                        path={path}
                    />
                )}
            </div>
            {editor && (
                <InputModal
                    handleClose={() => setEditior(false)}
                    path={path}
                    lesson={lesson}
                />
            )}
        </>
    )
}

export default Homework
