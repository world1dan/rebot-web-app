import { createContext } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence, doc, collection } from "firebase/firestore";
import { getRemoteConfig } from "firebase/remote-config";



export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g",
    authDomain: "rebot-f643e.firebaseapp.com",
    projectId: "rebot-f643e",
    storageBucket: "rebot-f643e.appspot.com",
    messagingSenderId: "329205426356",
    appId: "1:329205426356:web:d8c730df77b0d7b9890fe1"
});

export const firestore = getFirestore();
export const remoteConfig = getRemoteConfig()


remoteConfig.settings.minimumFetchIntervalMillis = 110000;



enableIndexedDbPersistence(firestore, { forceOwnership: true })
.catch((err) => {
        console.log(err.code);
    });


const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location = "./auth.html";
}

const id = `${user.id}`;

export const database = {
    timetable: doc(firestore, "timeTables", "9D"),
    settings: doc(firestore, "users", id, "userStorage", "config"),
    workspace: doc(firestore, "users", id, "userStorage", "workspace"),
    marks: doc(firestore, "users", id, "userStorage", "marks"),
    notes: collection(firestore, "users", id, "notes"),
    firestore
}


export const settingsContext = createContext(null);
export const manifestContext = createContext(null);
export const timetableContext = createContext(null);