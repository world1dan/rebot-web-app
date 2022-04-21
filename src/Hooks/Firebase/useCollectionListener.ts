import { useState, useEffect } from 'react'
import { CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore'

const useCollectionListener = (collectionRef: CollectionReference) => {
    const [collection, setCollection] = useState<QuerySnapshot | []>([])

    useEffect(() => {
        return onSnapshot(collectionRef, setCollection)
    }, [collectionRef])

    return collection
}

export default useCollectionListener
