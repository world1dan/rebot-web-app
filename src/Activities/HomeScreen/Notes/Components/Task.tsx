import { FC, useEffect, useState } from 'react'

import { deleteDoc, setDoc, DocumentReference } from 'firebase/firestore'

import TextareaAutosize from 'react-textarea-autosize'

import ContextMenu from '../../../../Components/ContextMenu'
import ContextMenuBtn from '../../../../Components/ContextMenu/ContextMenuBtn'

import CheckBox from '../../../../Components/Checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ITask } from '../types'
import { css } from '@linaria/core'

const styles = css`
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;

    border-radius: 5px;
    box-shadow: 0 0 0 1px var(--borders-soft) inset;
    padding-right: 32px;
    position: relative;
    padding: 4px;

    textarea {
        color: var(--text1);
        font-size: 17px;
        padding: 6px;
        padding-left: 10px;
        padding-top: 8px;
        resize: none;
        width: 100%;
    }

    .context-menu-btn {
        position: absolute;
        right: 0;
        top: 3px;
    }

    &.completed {
        textarea {
            text-decoration: line-through;
        }
    }

    &:last-of-type {
        border-radius: 5px 5px 9px 9px;
    }
`

export interface ITaskProps {
    taskData: ITask
    docRef: DocumentReference
}

const Task: FC<ITaskProps> = ({ taskData, docRef }) => {
    const [text, setText] = useState(taskData.text)

    useEffect(() => {
        setText(taskData.text)
    }, [taskData.text])

    function removeNote() {
        deleteDoc(docRef)
    }

    function changeNote() {
        setDoc(docRef, { text }, { merge: true })
    }

    const changeIsCompleted = (state: boolean) => {
        setDoc(docRef, { isCompleted: state }, { merge: true })
    }

    return (
        <div className={styles + (taskData.isCompleted ? ' completed' : '')}>
            <CheckBox isChecked={taskData.isCompleted} handleChange={changeIsCompleted} />
            <TextareaAutosize
                maxRows={14}
                value={text}
                placeholder="Новая задача.."
                onBlur={changeNote}
                onChange={(event) => setText(event.target.value)}
            />
            <ContextMenu stayActiveOnClick={false}>
                <ContextMenuBtn
                    onClick={removeNote}
                    title="Удалить"
                    icon={<FontAwesomeIcon icon={faTrashAlt} size="lg" />}
                />
            </ContextMenu>
        </div>
    )
}

export default Task
