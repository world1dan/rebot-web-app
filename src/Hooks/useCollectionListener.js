import { useState, useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'

const useCollectionListener = (collectionRef) => {
    const [collection, setCollection] = useState([])

    useEffect(() => {
        return onSnapshot(collectionRef, (collection) => {
            setCollection(collection)
        })
    }, [collectionRef])

    return collection
}

export default useCollectionListener
