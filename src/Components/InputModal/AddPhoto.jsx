import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@linaria/core'
import { getStorage, ref } from 'firebase/storage'

import { useId, useRef } from 'react'
import useFirebaseStorage from '../../Hooks/Firebase/useFirebaseStorage'

import AttachButton from './AttachButton'

const uploadStateStyles = css`
    width: 100%;
    padding: 10px;
    background: var(--bg4);
    border-radius: 7px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    .progress {
        height: 16px;
        width: 120px;
        background: var(--bg3);
        border-radius: 5px;
    }
`

const UploadState = ({ uploadState, uploadTask }) => {
    return (
        <div className={uploadStateStyles}>
            {uploadState?.state}
            {uploadState?.progress}%
            <div
                className="progress"
                style={{
                    borderLeft: `${
                        (uploadState?.progress / 100) * 120
                    }px var(--green) solid`,
                }}
            ></div>
        </div>
    )
}

const AddPhoto = ({ addPhotoAttachmentURL }) => {
    const inputID = useId()
    const input = useRef()

    const { uploadFile } = useFirebaseStorage()

    const handleAttachButtonClick = () => {
        input.current.click()
    }

    const attachPhoto = async (event) => {
        const photo = event.target.files[0]
        const storage = getStorage()

        if (photo) {
            const url = await uploadFile(
                ref(storage, `lessons-attachments/${Date.now()}`),
                photo,
                {
                    cacheControl: 'public,max-age=864000',
                }
            )

            if (typeof url == 'string') {
                addPhotoAttachmentURL(url)
            }
        }
    }

    return (
        <>
            <AttachButton
                icon={
                    <FontAwesomeIcon
                        icon={faImages}
                        color="var(--red)"
                        size="lg"
                    />
                }
                onClick={handleAttachButtonClick}
            />
            <input
                className="hidden-input"
                id={inputID}
                ref={input}
                onChange={attachPhoto}
                type="file"
                style={{ display: 'none' }}
                accept="image/x-png,image/gif,image/jpeg"
            />
        </>
    )
}

export default AddPhoto
