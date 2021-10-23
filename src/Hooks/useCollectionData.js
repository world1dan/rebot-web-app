import { onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"


export default function useCollectionData(collectionRef, onUpdate) {

    const [collectionDocs, setCollectionDocs] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(collectionRef, snapshot => {
            setCollectionDocs(snapshot.docs)

            snapshot.docChanges().forEach((change) => {
                if (change.type === "added" && !snapshot.metadata.fromCache && !change.doc.metadata.hasPendingWrites) {
                    if (onUpdate) onUpdate(change.doc.data())
                }
            })
        })

        return () => unsubscribe()
    }, [collectionRef])

    return collectionDocs
}