import { useState } from 'react'
import { css } from '@linaria/core'

import { ILesson } from '../../../../../types'
import PhotoViewer from '../../../../../Components/PhotoViewer'
import useLessonController from '../useLessonController'

const styles = css`
    background: var(--bg3);
    border-radius: 9px;
    padding: 14px;
    color: var(--red);

    overflow-x: auto;

    .photo {
        border-radius: 7px;
        margin-bottom: 0;
        padding-bottom: 0;
        cursor: pointer;
    }
`

export interface IAttachedPhotoProps {
    URL: string
    lesson: ILesson
    path: string
}

const AttachedPhoto = ({ URL, lesson, path }: IAttachedPhotoProps) => {
    const [photoViewerOpen, setPhotoViewerOpen] = useState<boolean>(false)
    const { removePhotoAttachment } = useLessonController(lesson, path)
    return (
        <>
            <div className={styles}>
                <img
                    className="photo"
                    src={URL}
                    width="120px"
                    onClick={() => setPhotoViewerOpen(true)}
                />
            </div>
            {photoViewerOpen && (
                <PhotoViewer
                    URL={URL}
                    handleClose={() => setPhotoViewerOpen(false)}
                    handleRemove={removePhotoAttachment}
                />
            )}
        </>
    )
}

export default AttachedPhoto
