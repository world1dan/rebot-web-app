import { useState } from 'react'
import { css } from '@linaria/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

import PhotoViewer from '../../../../../Components/PhotoViewer'
import useLessonController from '../useLessonController'

const styles = css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    padding-right: 6px;
    font-size: 18px;

    svg {
        color: var(--red);
    }
`
const AttachedPhoto = ({ URL, lesson, path }) => {
    const [photoViewer, setPhotoViewer] = useState(false)

    const { removePhotoAttachment } = useLessonController(lesson, path)
    return (
        <>
            <button className={styles} onClick={() => setPhotoViewer(true)}>
                <FontAwesomeIcon icon={faImages} />
            </button>
            {photoViewer && (
                <PhotoViewer
                    URL={URL}
                    handleClose={() => setPhotoViewer(false)}
                    handleRemove={removePhotoAttachment}
                />
            )}
        </>
    )
}

export default AttachedPhoto
