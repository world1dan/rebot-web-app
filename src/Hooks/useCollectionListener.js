import { onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export default function useCollectionListener(collectionRef) {
    const [collection, setCollection] = useState([])

    useEffect(() => {
        return onSnapshot(collectionRef, (collection) => {
            setCollection(collection)
        })
    }, [collectionRef])

    return collection
}
