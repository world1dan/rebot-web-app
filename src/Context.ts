import { createContext } from 'react'

import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    enableIndexedDbPersistence,
    disableNetwork,
} from 'firebase/firestore'

import { PlatformTypes } from './Utils/getPlatform'
import { ISubjectsManifest } from './types'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

export const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

export const firestore = getFirestore()

enableIndexedDbPersistence(firestore, { forceOwnership: true })

export const manifestContext = createContext<ISubjectsManifest | null>(null)

interface IUser {
    id: string
    first_name: string
    last_name: string
    group: number
}
interface IConfigContext {
    user?: IUser
    setStatusBar?: () => void
    updateFounded?: boolean
    platform?: PlatformTypes
}
export const ConfigContext = createContext<IConfigContext>({})
export const TimeTableContext = createContext(null)
export const MarksContext = createContext(null)

if (process.env.NODE_ENV == 'development') {
    disableNetwork(firestore)
}

const storage = getStorage()
connectStorageEmulator(storage, 'localhost', 9199)
