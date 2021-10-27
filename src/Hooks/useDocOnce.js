import { getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"


export default function useDocOnce(docRef) {
    const [docData, setDocData] = useState(null)
    

    useEffect(() => {
        getDoc(docRef).then(doc => {
            setDocData({...doc.data(), docId: doc.id })
        })
    }, [docRef])

  
    return docData
}