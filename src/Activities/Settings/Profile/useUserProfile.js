import { useContext, useCallback } from 'react'

import { setDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'

import { ConfigContext } from '../../../Context'
import useFirestoreListener from '../../../Hooks/useFirestoreListener'

const useUserProfile = () => {
    const userInfoDoc = useContext(ConfigContext).database.userInfo
    const user = useFirestoreListener(userInfoDoc)

    const updateProfile = (updates) => {
        setDoc(
            userInfoDoc,
            {
                ...updates,
            },
            { merge: true }
        )
    }

    const changeUsername = (newUsername) => {
        updateProfile({
            first_name: newUsername,
        })
    }

    const changeSurname = (newSurname) => {
        updateProfile({
            last_name: newSurname,
        })
    }

    const changeAvatar = useCallback(
        async (avatarFile) => {
            if (avatarFile.size > 10000000) {
                alert('Нельзя загрузить фото больше 10 мегабайт')
                return
            }
            const storage = getStorage()
            const avatarRef = ref(storage, `avatars/${user.id + Date.now()}`)

            await uploadBytes(avatarRef, avatarFile, {
                cacheControl: 'public,max-age=864000',
            })

            const avatarUrl = await getDownloadURL(avatarRef)

            setDoc(
                userInfoDoc,
                {
                    photo_url: avatarUrl,
                },
                { merge: true }
            )
        },
        [user]
    )

    return { user, changeUsername, changeSurname, changeAvatar }
}

export default useUserProfile
