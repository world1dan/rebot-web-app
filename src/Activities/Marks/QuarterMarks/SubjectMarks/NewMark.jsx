import { useState, memo } from 'react'
import { css } from '@linaria/core'

import { motion } from 'framer-motion'

import ActionSheet from 'Components/ActionSheet'
import PlusRounded from 'Components/Icons/PlusRounded'
import MarksKeyboard from '../../MarksKeyboard'

const styles = css`
    .newMarkBtn {
        will-change: transform;
    }
`

const NewMark = ({ addQuarterMark, subject }) => {
    const [addDialog, setAddDialog] = useState(false)

    const onSubmit = (data) => {
        setTimeout(() => {
            addQuarterMark(data)
        }, 80)
    }

    const openAddDialog = () => setAddDialog(true)
    const closeAddDialog = () => setAddDialog(false)

    return (
        <>
            <motion.div
                className={'Mark ' + styles}
                onClick={openAddDialog}
                layout="position"
                layoutScroll
            >
                <PlusRounded width={18} height={18} />
            </motion.div>
            {addDialog && (
                <ActionSheet bottomCloseBtn onClose={closeAddDialog}>
                    <MarksKeyboard
                        onSubmit={onSubmit}
                        title="Нажми на оценку чтобы добавить"
                        descr={subject.full_title ?? subject.title}
                    />
                </ActionSheet>
            )}
        </>
    )
}

export default memo(NewMark)
