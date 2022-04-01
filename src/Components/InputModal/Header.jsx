import { css } from '@linaria/core'

import AddLink from './AddLink'
import AddPhoto from './AddPhoto'

const styles = css`
    display: flex;

    align-items: center;
    gap: 8px;

    .subject {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        padding: 0 40px;
        font-weight: bold;
        font-size: 15px;
        border-radius: 7px;
        color: #fff;

        margin-left: 0;
        margin-right: auto;
    }

    @media (max-width: 360px) {
        gap: 8px;
        flex-wrap: wrap;
    }
`

const Header = ({ subject, setLink, lesson, setPhoto }) => {
    return (
        <header className={styles}>
            <div
                className="subject"
                style={{ backgroundColor: subject.color ?? 'var(--bg4)' }}
            >
                {subject.full_title || subject.title}
            </div>
            <AddLink setLink={setLink} currentLink={lesson.link} />
            <AddPhoto setPhoto={setPhoto} />
        </header>
    )
}

export default Header
