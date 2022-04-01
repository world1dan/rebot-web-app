import { css } from '@linaria/core'
import { useState, useEffect } from 'react'

import InputField from '../../../Components/Blocks/InputField'
import Avatar from './Avatar'
import useUserProfile from './useUserProfile'

const styles = css`
    display: grid;
    grid-template-columns: 110px 1fr;

    gap: 16px;

    .info {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`

const Profile = ({ themeTitleStyles }) => {
    const { user, changeUsername, changeAvatar } = useUserProfile()

    const [usernameInputValue, setUsernameInputValue] = useState('')

    useEffect(() => {
        if (user) {
            setUsernameInputValue(user.first_name)
        }
    }, [user])

    return (
        <div className={styles}>
            <Avatar avatarURL={user?.photo_url} changeAvatar={changeAvatar} />

            <div className="info">
                <div className={themeTitleStyles}>Твое имя</div>
                <InputField
                    value={usernameInputValue}
                    onChange={(event) => setUsernameInputValue(event.target.value)}
                    showSaveButton={user && usernameInputValue !== user?.first_name}
                    onSave={changeUsername}
                />
            </div>
        </div>
    )
}
export default Profile
