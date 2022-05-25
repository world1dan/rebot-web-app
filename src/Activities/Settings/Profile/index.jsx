import { css } from '@linaria/core'
import { useState, useEffect } from 'react'

import InputField from '../../../Components/Blocks/InputField'
import Avatar from './Avatar'
import useUserProfile from './useUserProfile'

const styles = css`
    display: grid;
    grid-template-rows: 120px 1fr;
    align-items: center;
    gap: 16px;

    .info {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .caption {
        color: var(--text2);
        font-size: 14px;
        padding-left: 14px;
        font-weight: 600;
    }
`

const Profile = () => {
    const { user, changeUsername, changeAvatar, changeSurname } =
        useUserProfile()

    const [usernameInputValue, setUsernameInputValue] = useState('')
    const [surnameInputValue, setSurnameInputValue] = useState('')

    useEffect(() => {
        if (user) {
            setUsernameInputValue(user.first_name)
            setSurnameInputValue(user.last_name)
        }
    }, [user])

    return (
        <div className={styles}>
            <Avatar avatarURL={user?.photo_url} changeAvatar={changeAvatar} />

            <div className="info">
                <div className="caption">Имя</div>
                <InputField
                    value={usernameInputValue}
                    onChange={(event) =>
                        setUsernameInputValue(event.target.value)
                    }
                    showSaveButton={
                        user &&
                        usernameInputValue &&
                        usernameInputValue !== user?.first_name
                    }
                    onSave={changeUsername}
                />
                <div className="caption">Фамилия</div>
                <InputField
                    value={surnameInputValue}
                    onChange={(event) =>
                        setSurnameInputValue(event.target.value)
                    }
                    showSaveButton={
                        user &&
                        surnameInputValue &&
                        surnameInputValue !== user?.last_name
                    }
                    onSave={changeSurname}
                />
            </div>
        </div>
    )
}
export default Profile
