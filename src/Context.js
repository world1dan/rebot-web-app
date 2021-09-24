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
enableIndexedDbPersistence(firestore, { forceOwnership: true });

export const remoteConfig = getRemoteConfig()
remoteConfig.settings.minimumFetchIntervalMillis = 2400000;


const userJSON = localStorage.user


if (!userJSON) {
    window.location = "./auth.html";
}

const userObj = JSON.parse(userJSON)


const id = `${userObj.id}`;

export const database = {
    timetable: doc(firestore, "timeTables", "9D"),
    marks: doc(firestore, "users", id, "userStorage", "marks"),
    notes: collection(firestore, "users", id, "notes")
}

export const user = {
    group: userObj.group
}


export const manifestContext = createContext(null);