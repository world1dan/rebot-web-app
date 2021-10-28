

import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import { doc, collection } from "firebase/firestore"
import { firestore } from "./Context"

import App from "./App"
import Login from "./Activities/Login"

const isSafari = /iPad|iPhone/.test(navigator.platform) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
globalThis.ios = isSafari





const AppWraper = () => {
    const [user, setUser] = useState(null)
    const [database, setDatabase] = useState(null)



    function loadUser(userData) {
        const id = `${userData.id}`

        const database = {
            userInfo: doc(firestore, "users", id),
            timetable: doc(firestore, "timeTables", "9D"),
            marks: doc(firestore, "users", id, "userStorage", "marks"),
            notes: collection(firestore, "users", id, "notes"),
        }
        setUser(userData)
        setDatabase(database)
    }



    

    useEffect(() => {
        const userJSON = localStorage.getItem("user")


        if (userJSON != null && userJSON != "null") {
            loadUser(JSON.parse(userJSON))
        } else {
            //setUser("login")
            loadUser(JSON.parse("{\"id\":2312346049249,\"first_name\":\"Даник\",\"username\":\"world1dan\",\"photo_url\":\"https://t.me/i/userpic/320/-wjS6LMe-1tZv-m0sojDlCBc1O5kGM5yQZdJPDAaTCY.jpg\",\"auth_date\":1633207905,\"hash\":\"4d3265e08e8afb12d3bdc45d499ab78d73a10bd6cb1d5408804b77b805e59731\",\"group\":\"1\"}"))
        }
    }, [])

    

    return (
        user && database ? <App config={{database, user, chat: localStorage.chat }}/> : user == "login" &&

            <Login setUser={loadUser}/>
    )
}




const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<AppWraper/>)



if (process.env.NODE_ENV == "production" && navigator.serviceWorker) {
    navigator.serviceWorker.register("./sw.js")
}

window.addEventListener("error", (e) => {
    alert(e.error)
})