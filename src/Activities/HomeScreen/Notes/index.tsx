import { useContext, memo, ReactNode } from 'react'
import {
    addDoc,
    DocumentData,
    DocumentSnapshot,
    orderBy,
    Query,
    query,
} from 'firebase/firestore'

import { ConfigContext } from '../../../Context'

import useCollectionListener from '../../../Hooks/Firebase/useCollectionListener'
import Card from '../../../Components/Blocks/Card'
import Note from './Components/Note'
import AddNote from './AddNote'

import './style.scss'
import { ITask } from './types'
import Task from './Components/Task'

const Notes = () => {
    const context = useContext(ConfigContext)
    const database = context.database

    const notesQuery: Query<DocumentData> = query(
        database.notes,
        orderBy('createdAt', 'desc')
    )
    const notesCollection = useCollectionListener(notesQuery)

    const notes: ReactNode[] = []

    notesCollection.forEach((doc: DocumentSnapshot) => {
        const data = doc.data()
        if (!data) return

        if (!data.type || data.type === 'text') {
            notes.push(<Note docRef={doc.ref} key={doc.id} noteData={data} />)
        } else if (data.type === 'task') {
            notes.push(<Task key={doc.id} taskData={data as ITask} docRef={doc.ref} />)
        }
    })

    const createNote = () => {
        addDoc(database.notes, {
            text: '',
            type: 'text',
            createdAt: new Date(),
        })
    }

    const createTask = () => {
        addDoc(database.notes, {
            text: '',
            type: 'task',
            createdAt: new Date(),
        })
    }

    return (
        <Card title="Заметки" subTitle={false}>
            <AddNote createNote={createNote} createTask={createTask} />
            <div className="content">{notes}</div>
        </Card>
    )
}

export default memo(Notes)
