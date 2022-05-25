import { FC } from 'react'
import { motion } from 'framer-motion'

import AddSquare from '../../../Components/Icons/AddSquare'
import { css } from '@linaria/core'

import ContextMenu from '../../../Components/ContextMenu'
import ContextMenuBtn from '../../../Components/ContextMenu/ContextMenuBtn'

import Note from '../../../Components/Icons/Note'
import CheckCircle from '../../../Components/Icons/CheckCircle'

const styles = css`
    padding: 0;
    margin-top: -3px !important;
    margin-right: -3px !important;
`

export interface Props {
    createNote: () => void
    createTask: () => void
}

const AddNote: FC<Props> = ({ createNote, createTask }) => {
    return (
        <div className={'table-btn ' + styles}>
            <ContextMenu
                stayActiveOnClick={false}
                icon={
                    <motion.div
                        className={styles}
                        whileTap={{
                            scale: 0.9,
                        }}
                    >
                        <AddSquare width={24} height={24} />
                    </motion.div>
                }
            >
                <ContextMenuBtn
                    title="Текст"
                    onClick={createNote}
                    icon={<Note width={26} />}
                />
                <ContextMenuBtn
                    title="Задача"
                    onClick={createTask}
                    icon={<CheckCircle width={19} />}
                />
            </ContextMenu>
        </div>
    )
}

export default AddNote
