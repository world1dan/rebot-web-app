import { onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react'


export default function useCollectionListener(collectionRef) {
    const [collection, setCollection] = useState([]);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collectionRef, (collection) => {
            setCollection(collection);
        });
        return () => unsubscribe()
    }, [collectionRef])

    return collection;
  }