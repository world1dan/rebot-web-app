import { onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"


export default function useDocData(doc) {
    const [docData, setDocData] = useState(null)
    
    useEffect(() => {
        const unsubscribe = onSnapshot(doc, (doc) => {
            setDocData({...doc.data(), docId: doc.id })
        })
        return () => unsubscribe()
    }, [doc])

  
    return docData
}