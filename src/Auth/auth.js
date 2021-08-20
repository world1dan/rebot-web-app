import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "@firebase/firestore/lite";
import "./auth.scss";
//<button onclick="onTelegramAuth({'id': 1046049249,'first_name': 'Даник','username': 'world1dan','photo_url': 'https://t.me/i/userpic/320/-wjS6LMe-1tZv-m0sojDlCBc1O5kGM5yQZdJPDAaTCY.jpg','auth_date': 1626863014,'hash': '00bbd3863ce078e160bd57b31287c7959dfff66af0a00d6357b2446fbbcaa052'})">TEST</button>
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

    setDoc(doc(firestore, "users", `${user.id}`), user)

    const userJSON = JSON.stringify(user);

    localStorage.setItem("user", userJSON);

    window.location = "./index.html";
}





