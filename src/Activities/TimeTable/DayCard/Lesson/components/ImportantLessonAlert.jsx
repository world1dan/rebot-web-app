import { css } from '@linaria/core'

const styles = css`
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: -6px;
    padding: 3px;
    padding-left: 10px;
    text-align: center;
    border-radius: 5px 5px 0 0;
`

const ImportantLessonAlert = ({ subject }) => {
    return (
        <div
            className={styles}
            style={{
                background: subject?.color,
            }}
        >
            На этом уроке к/р или самостоялка
        </div>
    )
}

export default ImportantLessonAlert
