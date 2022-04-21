import { initializeApp } from 'firebase/app'
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth'

import {
    getFirestore,
    enableIndexedDbPersistence,
    disableNetwork,
} from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g',
    authDomain: 'rebot-f643e.firebaseapp.com',
    databaseURL: 'https://rebot-f643e-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'rebot-f643e',
    storageBucket: 'rebot-f643e.appspot.com',
    messagingSenderId: '329205426356',
    appId: '1:329205426356:web:d8c730df77b0d7b9890fe1',
    measurementId: 'G-R054X17WD2',
})

initializeAuth(firebaseApp, {
    persistence: indexedDBLocalPersistence,
})

export const firestore = getFirestore()

enableIndexedDbPersistence(firestore, { forceOwnership: true })

if (process.env.NODE_ENV == 'development') {
    //disableNetwork(firestore)
}
