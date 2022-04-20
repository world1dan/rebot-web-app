import { createContext } from 'react'

import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    enableIndexedDbPersistence,
    disableNetwork,
} from 'firebase/firestore'

import { PlatformTypes } from './Utils/getPlatform'
import { ISubjectsManifest } from './types'

export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g',
    appId: '1:329205426356:web:d8c730df77b0d7b9890fe1',
    projectId: 'rebot-f643e',
    storageBucket: 'gs://rebot-f643e.appspot.com',
})

export const firestore = getFirestore()

enableIndexedDbPersistence(firestore, { forceOwnership: true })

export const manifestContext = createContext<ISubjectsManifest | null>(null)

interface IConfigContext {
    user?: Object
    setStatusBar?: Function
    updateFounded?: Boolean
    platform?: PlatformTypes
}
export const ConfigContext = createContext<IConfigContext>({})
export const TimeTableContext = createContext(null)
export const MarksContext = createContext(null)

if (process.env.NODE_ENV == 'development') {
    disableNetwork(firestore)
}
