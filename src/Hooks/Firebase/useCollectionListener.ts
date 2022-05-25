import { useState, useEffect } from 'react'
import {
    CollectionReference,
    DocumentData,
    onSnapshot,
    Query,
    QuerySnapshot,
} from 'firebase/firestore'

const useCollectionListener = (
    collectionRef: CollectionReference<DocumentData> | Query<DocumentData>
) => {
    const [collection, setCollection] = useState<QuerySnapshot | []>([])

    useEffect(() => {
        return onSnapshot(collectionRef, setCollection)
    }, [])

    return collection
}

export default useCollectionListener
