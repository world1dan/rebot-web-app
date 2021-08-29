import { onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react'


export default function useFirestoreListener(doc) {
    const [docData, setDocData] = useState(null);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(doc, (doc) => {
            setDocData(doc.data());
        });
        return () => unsubscribe()
    }, [doc])

  
    return docData;
  }