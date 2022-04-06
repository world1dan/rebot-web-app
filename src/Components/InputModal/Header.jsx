import { css } from '@linaria/core'

import AddLink from './AddLink'
import AddPhoto from './AddPhoto'

const styles = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    .subject {
        display: grid;
        place-items: center;
        padding: 0 8px;
        height: 40px;
        flex-grow: 1;
        font-weight: bold;
        font-size: 15px;
        border-radius: 7px;
        color: #fff;
        max-width: 200px;
        margin-left: 0;
        margin-right: auto;
    }
`

const Header = ({ subject, setLink, lesson, addPhotoAttachmentURL }) => {
    return (
        <header className={styles}>
            <div
                className="subject"
                style={{ backgroundColor: subject.color ?? 'var(--bg4)' }}
            >
                {subject.full_title || subject.title}
            </div>
            <AddLink setLink={setLink} currentLink={lesson.link} />
            <AddPhoto addPhotoAttachmentURL={addPhotoAttachmentURL} />
        </header>
    )
}

export default Header
