import React, { useState, PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { initializeApp } from "firebase/app";

import {
    initializeFirestore,
    CACHE_SIZE_UNLIMITED,
    enableIndexedDbPersistence,
    doc,
    setDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";


import Week from './TimeTable/Week';
import Marks from './Marks';

import './style.scss';







const firebaseConfig = {
    apiKey: "AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g",
    authDomain: "rebot-f643e.firebaseapp.com",
    projectId: "rebot-f643e",
    storageBucket: "rebot-f643e.appspot.com",
    messagingSenderId: "329205426356",
    appId: "1:329205426356:web:d8c730df77b0d7b9890fe1"
};

const firebaseApp = initializeApp(firebaseConfig);

const firestore = initializeFirestore(firebaseApp, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

window.firestore = firestore;

enableIndexedDbPersistence(firestore, { forceOwnership: true })
    .catch((err) => {
        console.log(err.code);
    });




onSnapshot(doc(firestore, "appConfig", "subjects"), (snapshot) => {
    const manifest = snapshot.data();

    const week = <Week manifest={manifest} timetableRef={doc(firestore, "weeks", "1")}/>
    const marks = <Marks manifest={manifest} marksRef={user.marks}/>

    ReactDOM.render(week, document.getElementById('week'));
    ReactDOM.render(marks, document.getElementById('marks'));
});








class UI {

    static alert(text) {
        let alert = document.querySelector(".alert");
        alert.textContent = text;

        alert.style = "display: block; animation: alert 0.45s cubic-bezier(.5,.1,.3,1); animation-fill-mode: forwards;";

        if (window.active_timeout) {
            clearTimeout(window.active_timeout);
        }


        window.active_timeout = setTimeout(() => {

            alert.style = "display: block; animation: alert-down 0.4s cubic-bezier(.5,.1,.3,1); animation-fill-mode: forwards;";

            alert.addEventListener("animationend", () => {
                alert.style = "";
            }, { once: true });

            window.active_timeout = undefined;
        }, 1400);
    }

    static open(target) {
        target.style = "display: block; animation: slide-left 0.6s cubic-bezier(.5,.1,.3,1); animation-fill-mode: forwards;";
    }

    static slide(target) {
        target.classList.toggle("active");
    }

    static change_tab(target, btn) {
        const toClose = document.querySelector(".app.active");

        if (toClose == target) return;

        toClose.classList.remove("active");
        target.classList.add("active");

        toClose.scrollTo(0, 0);
        target.scrollTo(0, 0);

        window.scrollTo(0, 0);
        document.body.scrollTo(0, 0);

        if (btn) {
            document.querySelector(".bottom-nav span[active='true']").setAttribute("active", "false");
            btn.setAttribute("active", "true");
        }
    }

    static getInput(callback, param) {
        const searchWraper = document.querySelector("#rebot .search");

        const inputRebot = searchWraper.querySelector("input.rebot");
        const inputGoogle = searchWraper.querySelector("input.google");

        const iconGoogle = searchWraper.querySelector("img.google");
        const iconRebot = searchWraper.querySelector("img.rebot");

        inputRebot.classList.add("active");
        inputGoogle.classList.remove("active");

        inputRebot.focus();

        iconGoogle.classList.remove("active");
        iconRebot.classList.add("active");

        inputRebot.addEventListener("keydown", function handle(event) {
            if (event.key == "Enter") {
                const nums = inputRebot.value.replace(" ", "").split(',');

                callback(param, nums);

                inputRebot.blur();

                inputRebot.removeEventListener("keydown", handle);
            }
        });

        inputRebot.addEventListener("blur", function onBlur() {
            inputRebot.value = "";

            inputRebot.classList.remove("active");
            inputGoogle.classList.add("active");

            iconRebot.classList.remove("active");
            iconGoogle.classList.add("active");

            inputRebot.removeEventListener("blur", onBlur);
        }, { once: true });


    }
}

window.UI = UI;


const userData = {
    "id": 1046049249,
    "first_name": "Даник",
    "username": "world1dan",
    "photo_url": "https://t.me/i/userpic/320/-wjS6LMe-1tZv-m0sojDlCBc1O5kGM5yQZdJPDAaTCY.jpg",
    "auth_date": 1626863014,
    "hash": "00bbd3863ce078e160bd57b31287c7959dfff66af0a00d6357b2446fbbcaa052"
};

const id = userData.id.toString();

const user = {
    "id": userData.id,
    "settings": doc(firestore, id, "config"),
    "workspace": doc(firestore, id, "workspace"),
    "marks": doc(firestore, id, "marks")
};