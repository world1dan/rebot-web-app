import { useContext, useCallback } from 'react'

import { setDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'

import { ConfigContext } from '../../../Context'
import useFirestoreListener from '../../../Hooks/useFirestoreListener'

const useUserProfile = () => {
    const userInfoDoc = useContext(ConfigContext).database.userInfo
    const user = useFirestoreListener(userInfoDoc)

    const changeUsername = (newUsername) => {
        console.log(newUsername)
        setDoc(
            userInfoDoc,
            {
                first_name: newUsername,
            },
            { merge: true }
        )
    }

    const changeAvatar = useCallback(
        async (avatarFile) => {
            const storage = getStorage()
            const avatarRef = ref(storage, `avatars/${user.id + Date.now()}} `)

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

    return { user, changeUsername, changeAvatar }
}

export default useUserProfile
