import { css } from '@linaria/core'

const styles = css`
    width: fit-content;
    padding: 12px 40px;
    border-radius: 7px;
    font-size: 18px;
    position: relative;
    color: #fff;

    &::before {
        content: '';
        background: inherit;
        position: absolute;
        bottom: -7px;
        right: -7px;
        display: block;
        width: 100%;
        height: 100%;
        filter: brightness(var(--reduced-brightness));
        z-index: -1;
        border-radius: 7px;
    }
`

const SubjectName = ({ subject }) => {
    return (
        <h1
            className={styles}
            style={{
                background: subject.color,
            }}
        >
            {subject.full_title || subject.title}
        </h1>
    )
}

export default SubjectName
