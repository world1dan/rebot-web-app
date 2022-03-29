import { useEffect, useRef, useState } from 'react'

import { deleteDoc, setDoc } from 'firebase/firestore'

import TextareaAutosize from 'react-textarea-autosize'
import ContextMenu from '../../../Components/ContextMenu'
import ContextMenuBtn from '../../../Components/ContextMenu/ContextMenuBtn'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Note = ({ noteData, docRef }) => {
    const input = useRef(null)

    const [text, setText] = useState(noteData.text)

    const isPinned = noteData.isPinned

    useEffect(() => {
        setText(noteData.text)
    }, [noteData.text])

    function updateText() {
        setText(input.current.value)
    }

    function removeNote() {
        deleteDoc(docRef)
    }

    function changeNote() {
        setDoc(docRef, { text }, { merge: true })
    }

    function updatePin() {
        setDoc(
            docRef,
            {
                isPinned: !isPinned,
            },
            { merge: true }
        )
    }

    const className = 'note ' + (isPinned ? 'pinned' : '')

    return (
        <div className={className}>
            <TextareaAutosize
                maxRows={14}
                ref={input}
                value={text}
                placeholder="Новая заметка.."
                onBlur={changeNote}
                onChange={updateText}
            />
            <ContextMenu>
                <ContextMenuBtn
                    onClick={updatePin}
                    title={isPinned ? 'Не выделять' : 'Выделить'}
                    icon={<FontAwesomeIcon icon={faThumbtack} size="lg" />}
                />
                <ContextMenuBtn
                    onClick={removeNote}
                    title="Удалить"
                    icon={<FontAwesomeIcon icon={faTrashAlt} size="lg" />}
                />
            </ContextMenu>
        </div>
    )
}

export default Note
