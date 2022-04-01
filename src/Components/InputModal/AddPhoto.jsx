import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useId, useRef } from 'react'

import AttachButton from './AttachButton'

const AddPhoto = ({ setPhoto }) => {
    const inputID = useId()
    const input = useRef()

    const handleAttachButtonClick = () => {
        input.current.click()
    }

    const attachPhoto = async (event) => {
        const photo = event.target.files[0]

        if (photo) {
            setPhoto(photo)
        }
    }

    return (
        <>
            <AttachButton
                icon={<FontAwesomeIcon icon={faImages} color="var(--red)" size="lg" />}
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
