import { useContext, useState } from 'react'

import { ActionSheetContext } from '../../../Components/ActionSheet'
import useMarksController from '../useMarksController'

import MarksKeyboard from '../MarksKeyboard'
import Switch from 'Components/Blocks/Switch'
import ActionSheet from '../../../Components/ActionSheet'

const AboutMarkActions = ({ isYearMark, readOnly, mark, subject, quarter }) => {
    const { close } = useContext(ActionSheetContext)
    const { setYearMark, removeQuarterMark, removeYearMark, updateMark } =
        useMarksController(subject)
    const [updateMarkDialog, setUpdateMarkDialog] = useState(false)

    const handleChangeSubmit = (newMarkNum) => {
        if (isYearMark) {
            setYearMark(newMarkNum, quarter)
        } else {
            updateMark(mark, { mark: newMarkNum })
        }
    }

    const handleRemove = () => {
        close()

        setTimeout(() => {
            if (isYearMark) {
                removeYearMark(quarter)
            } else {
                removeQuarterMark(mark)
            }
        }, 170)
    }

    const handleImportanceChange = (e) => {
        updateMark(mark, { imp: e.target.checked })
    }

    return (
        <div className="btns">
            {!isYearMark && !readOnly && (
                <div className="important-mark-switch">
                    <Switch
                        checked={mark.imp}
                        onChange={handleImportanceChange}
                        noPadding
                        title="Контрольная"
                        descr="Отметить как оценку по к/р"
                        icon={
                            <i className="fa-solid fa-circle-exclamation"></i>
                        }
                    />
                </div>
            )}
            {!readOnly && (
                <>
                    <button onClick={() => setUpdateMarkDialog(true)}>
                        <i className="fa-solid fa-pen"></i>
                        Изменить
                    </button>
                    <button className="remove" onClick={handleRemove}>
                        <i className="fa-solid fa-trash-can"></i>
                        Удалить
                    </button>
                </>
            )}
            {updateMarkDialog && (
                <ActionSheet
                    bottomCloseBtn
                    onClose={() => setUpdateMarkDialog(false)}
                >
                    <MarksKeyboard
                        onSubmit={handleChangeSubmit}
                        title={
                            `Изменить оценку (${mark.mark})` +
                            (isYearMark ? ` за ${quarter} четверть` : '')
                        }
                        descr={subject.full_title || subject.title}
                    />
                </ActionSheet>
            )}
        </div>
    )
}

export default AboutMarkActions
