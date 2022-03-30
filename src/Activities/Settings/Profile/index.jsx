import { css } from '@linaria/core'
import { setDoc } from 'firebase/firestore'
import { useState, useContext, useEffect, useRef } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import InputField from '../../../Components/Blocks/InputField'
import { ConfigContext } from '../../../Context'
import useFirestoreListener from '../../../Hooks/useFirestoreListener'
import Avatar from './Avatar'

const styles = css`
    display: grid;
    grid-template-columns: 120px 1fr;

    gap: 16px;
`

const Profile = ({ themeTitleStyles }) => {
    const userInfoDoc = useContext(ConfigContext).database.userInfo
    const [username, setUsername] = useState('')
    const files = useRef()
    const user = useFirestoreListener(userInfoDoc)

    useEffect(() => {
        if (user) {
            setUsername(user.first_name)
        }
    }, [user])

    const changeUsername = () => {
        setDoc(
            userInfoDoc,
            {
                first_name: username,
            },
            { merge: true }
        )
    }

    const uploadNewAvatar = () => {
        const storage = getStorage()
        const storageRef = ref(storage, `avatars/${user.id}`)

        uploadBytes(storageRef, files.current.files[0]).then(() => {
            getDownloadURL(ref(storage, `avatars/${user.id}`)).then((url) => {
                setDoc(
                    userInfoDoc,
                    {
                        photo_url: url,
                    },
                    { merge: true }
                )
            })
        })
    }

    return (
        <div className={styles}>
            <Avatar avatarURL={user?.photo_url} />

            <div>
                <input type="file" ref={files}></input>
                <button onClick={uploadNewAvatar}>Submit</button>
                <div className={themeTitleStyles}>Твое имя</div>
                <InputField
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    showSaveButton={username !== user?.first_name}
                    onSave={changeUsername}
                />
            </div>
        </div>
    )
}
export default Profile
