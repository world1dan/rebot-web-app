import { useContext, useState, memo } from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faBook } from '@fortawesome/free-solid-svg-icons'

import { manifestContext } from '../../../../Context'
import PlusRounded from '../../../../Components/Icons/PlusRounded'
import useMarksController from '../../../Marks/useMarksController'

import HomeworkRe from '../../../HomeworkRe'
import InputModal from '../../../../Components/InputModal'
import LessonInfo from '../LessonInfo'
import ContextMenu from '../../../../Components/ContextMenu'
import ContextMenuBtn from '../../../../Components/ContextMenu/ContextMenuBtn'
import MarksKeyboard from '../../../Marks/MarksKeyboard'

import ActionSheet from '../../../../Components/ActionSheet'
import Link from './Link'

import './style.scss'

const SubjectRow = ({ lesson, path }) => {
    const manifest = useContext(manifestContext)
    const subject = manifest?.[lesson.id]

    const { addQuarterMark } = useMarksController(subject)

    const [isEditing, setIsEditing] = useState(false)
    const [instant, setInstant] = useState(false)
    const [info, setInfo] = useState(false)
    const [addMarkDialog, setAddMarkDialog] = useState(false)

    const isMath = lesson.id === 'alg' || lesson.id === 'geom'

    const title = subject?.title
    const homework = lesson.hw ?? ''

    const style = {
        background: subject?.color ?? 'var(--bg3)',
    }

    const openInputModal = () => setIsEditing(true)
    const closeInputModal = () => setIsEditing(false)

    const openInstant = () => setInstant(true)
    const closeInstant = () => setInstant(false)

    const openInfo = () => setInfo(true)
    const closeInfo = () => setInfo(false)

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
                <div className="rowBlock medium" style={style}>
                    {title}
                </div>
                <div className={'rowBlock mainField' + (lesson.link ? ' with-link' : '')}>
                    <div className="homework" onClick={openInputModal}>
                        {homework}
                    </div>
                    {lesson.link && <Link URL={lesson.link} />}
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
                    {isEditing && (
                        <InputModal
                            handleClose={closeInputModal}
                            path={path}
                            lesson={lesson}
                        />
                    )}
                </div>
            </div>

            {instant && <HomeworkRe lessonsData={[lesson]} handleClose={closeInstant} />}
            {info && (
                <LessonInfo
                    lesson={isMath ? { ...lesson, id: 'math' } : lesson}
                    subject={isMath ? manifest['math'] : subject}
                    handleClose={closeInfo}
                    path={path}
                />
            )}
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
