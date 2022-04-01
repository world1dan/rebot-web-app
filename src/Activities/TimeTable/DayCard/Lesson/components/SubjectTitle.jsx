import { css } from '@linaria/core'

const styles = css`
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    font-size: 13px;
    font-weight: bold;
`

const SubjectTitle = ({ subject }) => {
    return (
        <div
            className={styles}
            style={{
                background: subject?.color,
            }}
        >
            {subject.title}
        </div>
    )
}

export default SubjectTitle
