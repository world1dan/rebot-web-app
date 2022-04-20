import { useState, useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'

const useDocumentListener = (docRef) => {
    const [docData, setDocData] = useState(null)

    useEffect(() => {
        return onSnapshot(docRef, (doc) => {
            setDocData(doc.data())
        })
    }, [docRef])

    return docData
}

export default useDocumentListener
