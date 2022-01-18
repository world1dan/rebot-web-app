import { useEffect, useState, useContext } from "react"

import { ConfigContext } from "Context"
import { onSnapshot } from "firebase/firestore"


const useUsers = () => {
    const [users, setUsers] = useState()
    const usersCollection = useContext(ConfigContext).database.users
    
    useEffect(() => {
        return onSnapshot(usersCollection, (snapshot) => {
            const users = {}

            snapshot.forEach((doc) => {
                users[doc.id] = doc.data()
            })

            setUsers(users)
        })
    }, [])

    return users
}

export default useUsers