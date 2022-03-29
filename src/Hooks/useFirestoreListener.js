import { useState, useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'

const useFirestoreListener = (docRef) => {
    const [docData, setDocData] = useState(null)

    useEffect(() => {
        return onSnapshot(docRef, (doc) => {
            setDocData(doc.data())
        })
    }, [docRef])

    return docData
}

export default useFirestoreListener
