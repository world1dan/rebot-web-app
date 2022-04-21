import { useState, useEffect } from 'react'
import { DocumentReference, onSnapshot } from 'firebase/firestore'

const useDocumentListener = (docRef: DocumentReference) => {
    const [docData, setDocData] = useState<object | undefined | null>(null)

    useEffect(() => {
        return onSnapshot(docRef, (doc) => {
            setDocData(doc.data())
        })
    }, [docRef])

    return docData
}

export default useDocumentListener
