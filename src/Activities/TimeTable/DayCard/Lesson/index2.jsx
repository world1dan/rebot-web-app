import { useContext, useState, memo } from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faBook } from '@fortawesome/free-solid-svg-icons'

import { manifestContext } from '../../../../Context'
import PlusRounded from '../../../../Components/Icons/PlusRounded'
import useMarksController from '../../../Marks/useMarksController'

import HomeworkRe from '../../../HomeworkRe'
import InputModal from '../../../../Components/InputModal'
import LessonInfo from './LessonInfo'
import ContextMenu from '../../../../Components/ContextMenu'
import ContextMenuBtn from '../../../../Components/ContextMenu/ContextMenuBtn'
import MarksKeyboard from '../../../Marks/MarksKeyboard'

import ActionSheet from '../../../../Components/ActionSheet'
import Link from './Link'
import AttachedPhoto from './components/AttachedPhoto'
import './style.scss'

const SubjectRow = ({ lesson, path }) => {
    const { addQuarterMark } = useMarksController(subject)

    const [addMarkDialog, setAddMarkDialog] = useState(false)

    const homework = lesson.hw ?? ''

    const openInstant = () => setInstant(true)
    const closeInstant = () => setInstant(false)

    const openAddMarkDialog = () => setAddMarkDialog(true)
    const closeAddMarkDialog = () => setAddMarkDialog(false)

    return (
        <>
            {lesson.danger && (
                <div className="SubjectRow-danger-title" style={style}>
                    На этом уроке к/р или самостоялка
                </div>
            )}

            <div className={'flexRow' + (lesson.danger ? ' SubjectRow-danger' : '')}>
                <div className="rowBlock mainField">
                    {lesson.link && <Link URL={lesson.link} />}
                    {lesson.attachments?.length > 0 && (
                        <AttachedPhoto URL={lesson.attachments[0]} />
                    )}
                </div>
                <div className="rowBlock square">
                    <ContextMenu>
                        {subject?.url && homework && (
                            <ContextMenuBtn
                                onClick={openInstant}
                                title="Решение"
                                icon={<FontAwesomeIcon icon={faBook} size="xl" />}
                            />
                        )}
                        {(subject?.marks || isMath) && (
                            <ContextMenuBtn
                                onClick={openAddMarkDialog}
                                title="Новая оценка"
                                icon={<PlusRounded width={20} height={20} />}
                            />
                        )}
                        <ContextMenuBtn
                            onClick={openInfo}
                            title="Об Уроке"
                            icon={<FontAwesomeIcon icon={faInfoCircle} size="xl" />}
                        />
                    </ContextMenu>
                </div>
            </div>

            {addMarkDialog && (
                <ActionSheet onClose={closeAddMarkDialog} bottomCloseBtn>
                    <MarksKeyboard
                        onSubmit={addQuarterMark}
                        title="Новая оценка"
                        descr={isMath ? manifest['math'].title : subject.title}
                        statusBarAlert="Оценка добавлена"
                    />
                </ActionSheet>
            )}
        </>
    )
}

SubjectRow.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.string,
        hw: PropTypes.string,
        link: PropTypes.string,
        danger: PropTypes.bool,
    }).isRequired,

    path: PropTypes.string.isRequired,
}

export default memo(SubjectRow)
