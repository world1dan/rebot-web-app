import { useState, useEffect } from 'react'
import { onSnapshot } from 'firebase/firestore'

const useCollectionListener = (collectionRef) => {
    const [collection, setCollection] = useState([])

    useEffect(() => {
        return onSnapshot(collectionRef, setCollection)
    }, [collectionRef])

    return collection
}

export default useCollectionListener
