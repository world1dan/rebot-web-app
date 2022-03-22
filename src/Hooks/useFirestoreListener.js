import { onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export default function useFirestoreListener(docRef) {
    const [docData, setDocData] = useState(null)

    useEffect(() => {
        return onSnapshot(docRef, (doc) => {
            setDocData(doc.data())
        })
    }, [docRef])

    return docData
}
