import { faImages } from '@fortawesome/free-solid-svg-icons'
import { css } from '@linaria/core'
import ContextMenu from '../../../../../Components/ContextMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PhotoViewer from '../../../../../Components/PhotoViewer'
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
const AttachedPhoto = ({ URL }) => {
    const [photoViewer, setPhotoViewer] = useState(false)
    return (
        <>
            <button className={styles} onClick={() => setPhotoViewer(true)}>
                <FontAwesomeIcon icon={faImages} />
            </button>
            {photoViewer && (
                <PhotoViewer URL={URL} handleClose={() => setPhotoViewer(false)} />
            )}
        </>
    )
}

export default AttachedPhoto
