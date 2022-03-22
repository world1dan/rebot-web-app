import { useContext } from 'react'
import { css } from '@linaria/core'
import PropTypes from 'prop-types'

import H1 from 'Components/Typography/H1'
import Switch from 'Components/Blocks/Switch'
import VerticalLayout from 'Components/Layouts/VerticalLayout'

import SubjectMarks from 'Activities/Marks/QuarterMarks/SubjectMarks'
import { MarksContext } from 'Context'
import useLessonController from '../SubjectRow/useLessonController'
import SheetView from '../../../../Components/SheetView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

const styles = css`
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 14px;
    padding-left: 16px;
    background-color: var(--bg3);
    border-radius: 9px;
    box-shadow: 0 0 0 1px var(--lvl4-borders) inset;

    .title {
        color: var(--text2);
        font-weight: bold;
        font-size: 16px;
    }

    .marks-list {
        margin-top: 5px;
    }

    .homework-view {
        font-weight: 500;
        font-size: 18px;
        -webkit-user-select: all;
        user-select: all;
        word-break: break-word;
    }

    .last-changes-by {
        color: var(--text2);
        font-weight: 500;
        font-size: 14px;
    }
`

const InfoBlock = ({ title, children }) => {
    return (
        <div className={styles}>
            <div className="title">{title}</div>
            {children}
        </div>
    )
}

const LessonInfo = ({ lesson, path, subject, handleClose }) => {
    const marks = useContext(MarksContext)?.[lesson.id] ?? []
    const { setDanger } = useLessonController(lesson, path)

    const handleImportanceChange = (e) => {
        setDanger(e.target.checked)
    }

    return (
        <SheetView handleClose={handleClose}>
            <VerticalLayout>
                <H1 text={subject.full_title || subject.title} />

                <InfoBlock title="Домашнее задание">
                    <div className="homework-view">{lesson.hw}</div>
                    {lesson.changedBy && (
                        <div className="last-changes-by">
                            Записал: {lesson.changedBy}
                        </div>
                    )}
                </InfoBlock>

                {subject.marks && (
                    <InfoBlock title="Мои оценки">
                        <div className="marks-list">
                            <SubjectMarks
                                marks={marks}
                                subject={subject}
                                embedded
                            />
                        </div>
                    </InfoBlock>
                )}

                <Switch
                    checked={lesson.danger}
                    onChange={handleImportanceChange}
                    title="Здесь что-то страшное"
                    icon={
                        <FontAwesomeIcon icon={faSkullCrossbones} size="lg" />
                    }
                    descr="Отметить, что на этом уроке к/р или что-то еще"
                />
            </VerticalLayout>
        </SheetView>
    )
}

LessonInfo.propTypes = {
    lesson: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    subject: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
}

export default LessonInfo
