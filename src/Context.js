import { createContext } from "react"

import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence, disableNetwork } from "firebase/firestore"
import { getRemoteConfig } from "firebase/remote-config"


export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g",
    appId: "1:329205426356:web:d8c730df77b0d7b9890fe1",
    projectId: "rebot-f643e"
})

export const firestore = getFirestore()
enableIndexedDbPersistence(firestore, { forceOwnership: true })

export const remoteConfig = getRemoteConfig()
remoteConfig.settings.minimumFetchIntervalMillis = 2400000


export const manifestContext = createContext()
export const ConfigContext = createContext()
export const TimeTableContext = createContext()

if (process.env.NODE_ENV == "development") {
    disableNetwork(firestore)
}