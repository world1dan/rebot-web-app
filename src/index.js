

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
            marks: doc(firestore, "users", id, "userStorage", "marks_new"),
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
            if (process.env.NODE_ENV == "development") {
                loadUser(JSON.parse("{\"id\":2312346049249,\"first_name\":\"Даник\",\"group\":\"1\"}"))
            } else {
                setUser("login")
            }
        }
    }, [])

    

    return (
        user && database ? <App config={{database, user, chat: localStorage.chat == "true" ? true : false, marksRatingPattern: "2" }}/> : user == "login" &&

            <Login setUser={loadUser}/>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<AppWraper/>)



if (process.env.NODE_ENV == "production" && navigator.serviceWorker) {
    navigator.serviceWorker.register("./sw.js")
}