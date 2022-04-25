import { FC } from 'react'
import { motion } from 'framer-motion'

import AddSquare from '../../../Components/Icons/AddSquare'
import { css } from '@linaria/core'

import NoteIcon from '../../../Components/Icons/Note.svg'

const styles = css`
    position: absolute;
    top: 10px;
    right: 16px;
    display: flex;
    align-items: center;
    gap: 10px;

    .note-type-select {
        background: var(--bg2);
        border: 0;
        font-size: 16px;
    }
`

export interface Props {
    addNote: () => void
}

const AddNote: FC<Props> = ({ addNote }) => {
    return (
        <div className={styles}>
            <select className="note-type-select">
                <option value="">Текст</option>
                <option value="">Задача</option>
            </select>
            <NoteIcon></NoteIcon>
            <motion.button onClick={addNote} whileTap={{ scale: 0.85, opacity: 0.6 }}>
                <AddSquare width={24} height={24} />
            </motion.button>
        </div>
    )
}

export default AddNote
