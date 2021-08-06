import { createContext } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence, doc } from "firebase/firestore";


export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g",
    authDomain: "rebot-f643e.firebaseapp.com",
    projectId: "rebot-f643e",
    storageBucket: "rebot-f643e.appspot.com",
    messagingSenderId: "329205426356",
    appId: "1:329205426356:web:d8c730df77b0d7b9890fe1"
});

const firestore = getFirestore();

enableIndexedDbPersistence(firestore, { forceOwnership: true })
.catch((err) => {
        console.log(err.code);
    });

export const database = {
    manifest: doc(firestore, "appConfig", "subjects"),
    timetable: doc(firestore, "timeTables", "9D"),
    settings: doc(firestore, "1046049249", "config"),
    workspace: doc(firestore, "1046049249", "workspace"),
    marks: doc(firestore, "1046049249", "marks"),
    firestore
}

export const manifestContext = createContext(null);