import { FC, useState } from 'react'
import { css } from '@linaria/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'

import { ILesson } from '../../../../types'
import PhotoViewer from '../../../../Components/PhotoViewer'
import useLessonController from './useLessonController'

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

export interface IAttachedPhotoProps {
    URL: string
    lesson: ILesson
    path: string
}

const AttachedPhoto: FC<IAttachedPhotoProps> = ({ URL, lesson, path }) => {
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
