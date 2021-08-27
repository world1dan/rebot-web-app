import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "@firebase/firestore/lite";
import "./auth.scss";

initializeApp({
    apiKey: "AIzaSyAkNpqlq9hU_cDu1_4wQIBNNc9OJd4LT1g",
    authDomain: "rebot-f643e.firebaseapp.com",
    projectId: "rebot-f643e",
    storageBucket: "rebot-f643e.appspot.com",
    messagingSenderId: "329205426356",
    appId: "1:329205426356:web:d8c730df77b0d7b9890fe1"
});

const firestore = getFirestore();

window.onTelegramAuth = (user) => {


    setDoc(doc(firestore, "users", `${user.id}`), user);
    setDoc(doc(firestore, "users", `${user.id}`, "userStorage", "config"), {
        group: window.group
    }, { merge: true });

    const userJSON = JSON.stringify(user);

    localStorage.setItem("user", userJSON);

    window.location = "./index.html";
}
window.group = 1;

window.changeGroup = (btn, group) => {
    document.querySelector(".group button.active").classList.remove("active");
    btn.classList.add("active");
    window.group = group;
}





