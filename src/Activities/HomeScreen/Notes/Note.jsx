import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"


import { deleteDoc, setDoc } from "firebase/firestore"

import TextareaAutosize from "react-textarea-autosize"
import ContextMenu from "../../../Components/ContextMenu"
import ContextMenuBtn from "Components/ContextMenu/ContextMenuBtn"



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
        setDoc(docRef, { text }, {merge: true})
    }

    function updatePin() {
        setDoc(docRef, {
            isPinned: !isPinned
        }, {merge: true})
    }

    const className = "note " + (isPinned ?  "pinned" : "")

    return (
        <div className={className}>
            <TextareaAutosize maxRows={10} ref={input} value={text} placeholder="Новая заметка.." onBlur={changeNote} onChange={updateText}/>
            <ContextMenu>
                <ContextMenuBtn
                    onClick={updatePin}
                    title={ isPinned ? "Открепить" : "Закрепить" }
                    icon={ <i className="fas fa-thumbtack fa-lg"></i> }
                />
                <ContextMenuBtn
                    onClick={removeNote}
                    title="Удалить"
                    icon={ <i className="fas fa-trash-alt fa-lg"></i> }
                />
            </ContextMenu>
        </div>
    )
}



Note.propTypes = {
    noteData: PropTypes.object.isRequired,
    docRef: PropTypes.object.isRequired
}



export default Note