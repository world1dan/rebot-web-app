import { useContext } from 'react'
import { updateDoc } from 'firebase/firestore'

import { ConfigContext } from '../../../../Context'

import { getStorage, uploadBytes, getDownloadURL, ref } from 'firebase/storage'

const useLessonController = (lesson, path) => {
    const config = useContext(ConfigContext)

    const timetableDoc = config.database.timetable
    const user = config.user

    const setHomework = (value) => {
        if (value !== lesson.hw) {
            updateDoc(timetableDoc, {
                [path + '.hw']: value == undefined ? lesson.hw : value,
                [path + '.changedBy']:
                    user.first_name || user.last_name || user.username || user.id,
                [path + '.last_change']: Date.now(),
            })
        }
    }

    const setDanger = (state) => {
        updateDoc(timetableDoc, {
            [path + '.danger']: state,
        })
    }

    const setLink = (url) => {
        updateDoc(timetableDoc, {
            [path + '.link']: url,
        })
    }

    const setPhoto = async (photo) => {
        const storage = getStorage()
        const photoRef = ref(storage, `lessons-attachments/${Date.now()}`)

        await uploadBytes(photoRef, photo, {
            cacheControl: 'public,max-age=864000',
        })

        const attachmentURL = await getDownloadURL(photoRef)

        updateDoc(timetableDoc, {
            [path + '.attachments']: [attachmentURL],
        })
    }

    return { setHomework, setDanger, setLink, setPhoto }
}

export default useLessonController
