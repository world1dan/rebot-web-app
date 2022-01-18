import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

import { AnimatePresence, motion } from "framer-motion"
import ActionSheet from "Components/ActionSheet"
import PlusRounded from 'Components/Icons/PlusRounded'
import MarksKeyboard from '../../MarksKeyboard'



const NewMark = ({ addQuarterMark, subject }) => {
    const [addDialog, setAddDialog] = useState(false)

    const onSubmit = (data) => {
        setTimeout(() => {
            addQuarterMark(data)
        }, 90)
    }

    const openAddDialog = () => setAddDialog(true)
    const closeAddDialog = () => setAddDialog(false)


    return (
        <>
            <motion.div 
                className="Mark newMarkBtn" 
                onClick={openAddDialog}
                layout="position"
                key={subject.id}
            >
                <PlusRounded width={18} height={18}/>
            </motion.div>
            <AnimatePresence>
                { addDialog &&
                        <ActionSheet bottomCloseBtn onClose={closeAddDialog} >
                            <MarksKeyboard 
                                withImportanceSwitch 
                                onSubmit={onSubmit}
                                title="Нажми на оценку чтобы добавить" 
                                descr={subject.full_title ?? subject.title}
                            />
                        </ActionSheet>
                }
            </AnimatePresence>
        </>
    )
}




NewMark.propTypes = {
    addQuarterMark: PropTypes.func.isRequired,
    subject: PropTypes.object.isRequired
}

export default memo(NewMark)

