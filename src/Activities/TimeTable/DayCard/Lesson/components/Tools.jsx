import { useState } from 'react'
import { css } from '@linaria/core'

import ContextMenu from '../../../../../Components/ContextMenu'
import ContextMenuBtn from '../../../../../Components/ContextMenu/ContextMenuBtn'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import HomeworkRe from '../../../../HomeworkRe'
import LessonInfo from '../LessonInfo'

const styles = css`
    box-shadow: 0 0 0 1.4px var(--borders-soft) inset;
    height: 40px;
    line-height: 40px;
    text-align: center;
`

const Tools = ({ subject, lesson, path }) => {
    const [homeworkSolution, setHomeworkSolution] = useState(false)
    const [lessonInfo, setLessonInfo] = useState(false)

    return (
        <>
            <div className={styles}>
                <ContextMenu>
                    {subject?.url && lesson.hw && (
                        <ContextMenuBtn
                            onClick={() => setHomeworkSolution(true)}
                            title="Решение"
                            icon={<FontAwesomeIcon icon={faBook} size="xl" />}
                        />
                    )}
                    <ContextMenuBtn
                        onClick={() => setLessonInfo(true)}
                        title="Об Уроке"
                        icon={<FontAwesomeIcon icon={faInfoCircle} size="xl" />}
                    />
                </ContextMenu>
            </div>

            {lessonInfo && (
                <LessonInfo
                    lesson={lesson}
                    subject={subject}
                    handleClose={() => setLessonInfo(false)}
                    path={path}
                />
            )}

            {homeworkSolution && (
                <HomeworkRe
                    lessonsData={[lesson]}
                    handleClose={() => setHomeworkSolution(false)}
                />
            )}
        </>
    )
}

export default Tools
