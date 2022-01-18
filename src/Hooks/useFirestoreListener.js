import { onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'


export default function useFirestoreListener(doc) {
    const [docData, setDocData] = useState()

    useEffect(() => {
        return onSnapshot(doc, (doc) => {
            setDocData(doc.data())
        })
    }, [doc])


    return docData
}
