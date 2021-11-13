import { createContext } from "react"

import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence, disableNetwork } from "firebase/firestore"


export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g",
    appId: "1:329205426356:web:d8c730df77b0d7b9890fe1",
    projectId: "rebot-f643e"
})

export const firestore = getFirestore()

//if (process.env.NODE_ENV == "development") {

    //connectFirestoreEmulator(firestore,  "localhost", 8080)
//}


enableIndexedDbPersistence(firestore, { forceOwnership: true })
disableNetwork(firestore)

export const manifestContext = createContext(null)
export const ConfigContext = createContext(null)
export const TimeTableContext = createContext(null)
export const MarksContext = createContext(null)