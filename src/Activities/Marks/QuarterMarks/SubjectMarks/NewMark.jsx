import { useState, memo } from 'react'
import { motion } from 'framer-motion'

import ActionSheet from '../../../../Components/ActionSheet'
import PlusRounded from '../../../../Components/Icons/PlusRounded'
import MarksKeyboard from '../../MarksKeyboard'

const NewMark = ({ addQuarterMark, subject, layoutDependency }) => {
    const [addDialog, setAddDialog] = useState(false)

    const openAddDialog = () => setAddDialog(true)
    const closeAddDialog = () => setAddDialog(false)

    return (
        <>
            <motion.div
                className="Mark"
                onClick={openAddDialog}
                layout="position"
                layoutDependency={layoutDependency}
            >
                <PlusRounded width={18} height={18} />
            </motion.div>
            {addDialog && (
                <ActionSheet bottomCloseBtn onClose={closeAddDialog}>
                    <MarksKeyboard
                        onSubmit={addQuarterMark}
                        title="Нажми на оценку чтобы добавить"
                        descr={subject.full_title ?? subject.title}
                    />
                </ActionSheet>
            )}
        </>
    )
}

export default memo(NewMark)
