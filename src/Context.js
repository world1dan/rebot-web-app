import { createContext } from 'react'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    disableNetwork,
    enableIndexedDbPersistence,
} from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g',
    appId: '1:329205426356:web:d8c730df77b0d7b9890fe1',
    projectId: 'rebot-f643e',
    storageBucket: 'gs://rebot-f643e.appspot.com',
})

export const firestore = getFirestore()

enableIndexedDbPersistence(firestore, { forceOwnership: true })

export const storage = getStorage()

//connectStorageEmulator(storage, 'localhost', 9199)
export const manifestContext = createContext(null)
export const ConfigContext = createContext(null)
export const TimeTableContext = createContext(null)
export const MarksContext = createContext(null)

if (process.env.NODE_ENV == 'development') {
    disableNetwork(firestore)
}
