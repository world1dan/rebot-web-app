import { useContext, memo } from 'react'
import { motion } from 'framer-motion'
import { addDoc } from 'firebase/firestore'

import { ConfigContext } from '../../../Context'

import useCollectionListener from '../../../Hooks/Firebase/useCollectionListener'
import Card from '../../../Components/Blocks/Card'
import Note from './Note'
import AddSquare from '../../../Components/Icons/AddSquare'

import './style.scss'

const Notes = () => {
    const context = useContext(ConfigContext)
    const database = context.database

    const notesCollection = useCollectionListener(database.notes)?.docs ?? []

    const addNote = () => {
        if (notesCollection.length <= 20) {
            addDoc(database.notes, {
                text: '',
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
            <motion.button
                className="table-btn"
                onClick={addNote}
                whileTap={{ scale: 0.85, opacity: 0.6 }}
            >
                <AddSquare width={24} height={24} />
            </motion.button>
            <div className="content">
                {notesCollection.map((doc) => {
                    return <Note docRef={doc.ref} key={doc.id} noteData={doc.data()} />
                })}
            </div>
        </Card>
    )
}

export default memo(Notes)
