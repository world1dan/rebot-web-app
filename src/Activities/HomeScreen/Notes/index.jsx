import React, { useContext } from "react"

import { addDoc } from "firebase/firestore"

import { ConfigContext } from "../../../Context"
import useCollectionListener from "../../../Hooks/useCollectionListener"
import { showAlert } from "../../../Helpers/showAlert"

import Note from "./Note"

import "./style.scss"



const Notes = () => {
    const database = useContext(ConfigContext).database
    const notesCollection = useCollectionListener(database.notes)?.docs ?? []


    const notes = notesCollection.map((doc) => {
        return <Note docRef={doc.ref} key={doc.id} noteData={doc.data()}/>
    })


    const addNote = () => {
        if (notes.length <= 10) {
            addDoc(database.notes, {
                text: "",
                isPinned: false
            })
        } else {
            showAlert("Нельзя добавить больше 10 заметок")
        }
    }


    return (
        <div className="content-card" id="notes">
            <h1>Заметки</h1>
            <button id="add-note" onClick={addNote}>
                <svg width="30" height="30" viewBox="0 0 28 28" fill="currentColor"><path d="M13.9912 22.7422C18.9746 22.7422 23.0879 18.6289 23.0879 13.6543C23.0879 8.67969 18.9658 4.56641 13.9824 4.56641C9.00781 4.56641 4.90332 8.67969 4.90332 13.6543C4.90332 18.6289 9.0166 22.7422 13.9912 22.7422ZM9.7373 13.6631C9.7373 13.1445 10.1064 12.7842 10.6162 12.7842H13.1211V10.2793C13.1211 9.76953 13.4727 9.40918 13.9736 9.40918C14.4922 9.40918 14.8525 9.76953 14.8525 10.2793V12.7842H17.3662C17.8672 12.7842 18.2363 13.1445 18.2363 13.6631C18.2363 14.1641 17.8672 14.5244 17.3662 14.5244H14.8525V17.0293C14.8525 17.5303 14.4922 17.8994 13.9736 17.8994C13.4727 17.8994 13.1211 17.5303 13.1211 17.0293V14.5244H10.6162C10.1064 14.5244 9.7373 14.1641 9.7373 13.6631Z"/></svg>
            </button>
            <div className="content">
                {notes}
            </div>
        </div>
    )
}



export default Notes