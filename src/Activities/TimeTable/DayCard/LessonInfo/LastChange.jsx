import { css } from '@linaria/core'

const styles = css`
    color: var(--text2);
    font-weight: 400;
    font-size: 13px;
    margin: 4px 0;
`

const LastChange = ({ lesson }) => {
    const time = lesson.last_change
        ? new Date(lesson.last_change).toLocaleString('ru', {
              day: 'numeric',
              month: 'long',
              hour: 'numeric',
              minute: 'numeric',
          })
        : ''

    return (
        lesson.changedBy && (
            <div className={styles}>
                Записал: {lesson.changedBy + ', ' + time}
            </div>
        )
    )
}

export default LastChange
