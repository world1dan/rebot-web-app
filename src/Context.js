import { createContext } from "react"

import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from "firebase/firestore"
import { getRemoteConfig } from "firebase/remote-config"




export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g",
    authDomain: "rebot-f643e.firebaseapp.com",
    databaseURL: "https://rebot-f643e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rebot-f643e",
    storageBucket: "rebot-f643e.appspot.com",
    messagingSenderId: "329205426356",
    appId: "1:329205426356:web:d8c730df77b0d7b9890fe1",
    measurementId: "G-R054X17WD2"
})

export const firestore = getFirestore()


if (process.env.NODE_ENV == "development") {
    //connectFirestoreEmulator(firestore, "localhost", 8080)
}

enableIndexedDbPersistence(firestore, { forceOwnership: true })





export const remoteConfig = getRemoteConfig()
remoteConfig.settings.minimumFetchIntervalMillis = 2400000

export const manifestContext = createContext(null)
export const ConfigContext = createContext(null)
export const TimeTableContext = createContext(null)