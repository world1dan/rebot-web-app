import { useState } from 'react'

import { uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const useFirebaseStorage = () => {
    const [uploadState, setUploadState] = useState(null)
    const [uploadTask, setUploadTask] = useState(null)

    const uploadFile = (ref, file, metadata) => {
        const task = uploadBytesResumable(ref, file, metadata)

        setUploadTask(task)

        return new Promise((resolve, reject) => {
            task.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )

                    switch (snapshot.state) {
                        case 'paused':
                            break
                        case 'running':
                            break
                    }

                    setUploadState({
                        state: snapshot.state,
                        snapshot,
                        progress,
                    })
                },
                (error) => {
                    setUploadTask(null)
                    switch (error.code) {
                        case 'storage/unauthorized':
                            setUploadState({
                                error,
                                errorDescription: 'Ошибка: Недостаточно прав',
                            })
                            break
                        case 'storage/canceled':
                            setUploadState({
                                error,
                                errorDescription: 'Загрузка отменена',
                            })
                            break
                        case 'storage/unknown':
                            setUploadState({
                                error,
                                errorDescription: 'Произошла неизвестная ошибка',
                            })
                            break
                    }
                    reject(error)
                },
                () => {
                    getDownloadURL(task.snapshot.ref).then((downloadURL) => {
                        setUploadTask(null)
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    return { uploadFile, uploadTask, uploadState }
}

export default useFirebaseStorage
