import { FC, useState } from 'react'
import { css } from '@linaria/core'

import InputModal from '../../../../Components/InputModal'
import AttachedLink from './AttachedLink'
import AttachedPhoto from './AttachedPhoto'

import { ILesson } from '../../../../types'

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

    &.share-mode .text-area {
        overflow-x: initial;
        white-space: pre-wrap;
        padding: 4px;
    }

    &.large {
        height: 44px;
        font-size: 15px;
    }
`

export interface IHomeworkProps {
    lesson: ILesson
    path: string
    large?: boolean
    shareMode?: boolean
}

const Homework: FC<IHomeworkProps> = ({
    lesson,
    path,
    large = false,
    shareMode = false,
}) => {
    const [editor, setEditior] = useState(false)

    return (
        <>
            <div
                className={
                    styles + (large ? ' large' : '') + (shareMode ? ' share-mode' : '')
                }
            >
                <div className="text-area" onClick={() => setEditior(true)}>
                    {lesson.hw}
                </div>

                {lesson.link && <AttachedLink URL={lesson.link} />}
                {lesson.attachments && lesson.attachments.length > 0 && (
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
