import { FC, useState } from 'react'
import { css } from '@linaria/core'

import ContextMenu from '../../../../Components/ContextMenu'
import ContextMenuBtn from '../../../../Components/ContextMenu/ContextMenuBtn'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import HomeworkRe from '../../../HomeworkRe'
import LessonInfo from './LessonInfo'
import { ILesson, ISubject } from '../../../../types'

const styles = css`
    box-shadow: 0 0 0 1.4px var(--borders-soft) inset;
    height: 40px;
    line-height: 40px;
    text-align: center;
`

export interface IToolsProps {
    subject: ISubject
    lesson: ILesson
    path: string
}

const Tools: FC<IToolsProps> = ({ subject, lesson, path }) => {
    const [homeworkSolution, setHomeworkSolution] = useState<boolean>(false)
    const [lessonInfo, setLessonInfo] = useState<boolean>(false)

    return (
        <>
            <div className={styles}>
                <ContextMenu icon={null}>
                    {subject?.url && lesson.hw && (
                        <ContextMenuBtn
                            onClick={() => setHomeworkSolution(true)}
                            title="Решение"
                            icon={<FontAwesomeIcon icon={faBook} />}
                        />
                    )}
                    <ContextMenuBtn
                        onClick={() => setLessonInfo(true)}
                        title="Об Уроке"
                        icon={<FontAwesomeIcon icon={faInfoCircle} />}
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
