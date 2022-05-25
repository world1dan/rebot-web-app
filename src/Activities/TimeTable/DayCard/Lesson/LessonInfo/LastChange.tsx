import { css } from '@linaria/core'
import { ILesson } from '../../../../../types'

const styles = css`
    color: var(--text2);
    font-weight: 400;
    font-size: 13px;
    margin: 4px 0;
`

export interface ILastChangeProps {
    lesson: ILesson
}

const LastChange = ({ lesson }: ILastChangeProps) => {
    if (!lesson.last_change || !lesson.changedBy) return null

    const time = new Date(lesson.last_change).toLocaleString('ru', {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
    })

    return (
        lesson.changedBy && (
            <div className={styles}>
                Последнее изменение: {lesson.changedBy + ', ' + time}
            </div>
        )
    )
}

export default LastChange
