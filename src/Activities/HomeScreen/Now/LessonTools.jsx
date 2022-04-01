import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import HomeworkRe from '../../HomeworkRe'
import LessonInfo from '../../TimeTable/DayCard/Lesson/LessonInfo'
import { css } from '@linaria/core'

const styles = css`
    display: flex;
    gap: 6px;

    .tool-btn {
        align-items: center;
        background-color: var(--bg3);
        border-radius: 7px;
        box-shadow: 0 0 0 0.8px var(--lvl4-borders) inset;
        display: grid;
        flex-grow: 1;
        font-size: 14px;
        font-weight: 600;
        grid-template-columns: 23px 1fr;
        padding: 12px 10px;
    }
`
const LessonTools = ({ subject, lesson, path, isMath, manifest }) => {
    const [homeworkRe, setHomeworkRe] = useState(false)
    const [info, setInfo] = useState(false)

    return (
        <div className={styles}>
            {subject.url && lesson.hw && (
                <button className="tool-btn" onClick={() => setHomeworkRe(true)}>
                    <FontAwesomeIcon icon={faBook} size="lg" />
                    Решение
                </button>
            )}
            <button className="tool-btn" onClick={() => setInfo(true)}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Об уроке
            </button>

            {homeworkRe && (
                <HomeworkRe
                    lessonsData={[lesson]}
                    handleClose={() => setInstant(false)}
                />
            )}
            {info && (
                <LessonInfo
                    path={path}
                    lesson={isMath ? { ...lesson, id: 'math' } : lesson}
                    subject={isMath ? manifest['math'] : subject}
                    handleClose={() => setInfo(false)}
                />
            )}
        </div>
    )
}

export default LessonTools
