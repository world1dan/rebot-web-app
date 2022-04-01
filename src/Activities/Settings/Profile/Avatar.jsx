import { useId, useRef, useEffect } from 'react'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@linaria/core'
import useEventListener from '../../../Hooks/useEventListener'

const styles = css`
    padding: 4px;
    box-shadow: 0 0 0 3px var(--indigo);
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(0);
    -webkit-backdrop-filter: blur(0);
    .avatar {
        display: block;
        border-radius: 50%;
        object-fit: cover;
        height: 100%;
        aspect-ratio: 1 / 1;
    }

    .edit-avatar {
        cursor: pointer;
        display: block;
        text-align: center;
        padding-top: 2px;
        padding-bottom: 10px;
        position: absolute;
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        background: rgba(0, 0, 0, 0.432);
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 10px;
        font-weight: 500;
        color: #fff;

        letter-spacing: -0.3px;
    }

    .hidden-input {
        display: none;
    }
`

const Avatar = ({ avatarURL, changeAvatar }) => {
    const inputID = useId()

    const handleAvatarInputChange = (event) => {
        const avatarFile = event.target.files[0]

        if (avatarFile) {
            changeAvatar(avatarFile)
        }
    }

    return (
        <div className={styles}>
            <img src={avatarURL} width="100%" className="avatar"></img>

            <label className="edit-avatar" htmlFor={inputID}>
                Изменить
            </label>
            <input
                onChange={handleAvatarInputChange}
                className="hidden-input"
                id={inputID}
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
            />
        </div>
    )
}

export default Avatar
