import { css } from '@linaria/core'
import { useState } from 'react'
import PhotoViewer from '../../../../../Components/PhotoViewer'

const styles = css`
    display: grid;
    place-items: center;
    padding-top: 20px;

    .avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
    }

    .name {
        margin: 15px 0;
    }
`

function UserInfo({ user }) {
    const [fullscreenAvatar, setFullscreenAvatar] = useState(false)

    return (
        <>
            <div className={styles}>
                <img
                    src={user.photo_url}
                    className="avatar"
                    onClick={() => setFullscreenAvatar(true)}
                />
                <h2 className="name">{user.first_name + ' ' + (user.last_name ?? '')}</h2>
            </div>
            {fullscreenAvatar && (
                <PhotoViewer
                    URL={user.photo_url}
                    handleClose={() => setFullscreenAvatar(false)}
                />
            )}
        </>
    )
}

export default UserInfo
