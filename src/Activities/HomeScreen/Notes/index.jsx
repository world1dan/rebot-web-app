import { useContext, memo } from 'react'

import { addDoc } from 'firebase/firestore'

import { ConfigContext } from '../../../Context'

import useCollectionListener from '../../../Hooks/useCollectionListener'
import Card from '../../../Components/Blocks/Card'
import Note from './Note'
import AddSquare from '../../../Components/Icons/AddSquare'

import './style.scss'

const Notes = () => {
    const context = useContext(ConfigContext)
    const database = context.database

    const notesCollection = useCollectionListener(database.notes)?.docs ?? []

    const notes = notesCollection.map((doc) => {
        return <Note docRef={doc.ref} key={doc.id} noteData={doc.data()} />
    })

    const addNote = () => {
        if (notes.length <= 20) {
            addDoc(database.notes, {
                text: '',
                isPinned: false,
            })
        } else {
            context.setStatusBar({
                title: 'Нельзя добавить больше 20 заметок',
                type: 'error',
            })
        }
    }

    return (
        <Card title="Заметки">
            <button className="table-btn" onClick={addNote}>
                <AddSquare width={24} height={24} />
            </button>
            <div className="content">{notes}</div>
        </Card>
    )
}

export default memo(Notes)
