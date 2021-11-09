import React, { useEffect, useState } from "react"

import UI from "./UI"

import "./style.scss"



const Settings = () => {


    const [inversionState, setInversionState] = useState()
    const [themeState, setThemeState] = useState()


    useEffect(() => {
        const theme = localStorage.theme ?? "dark"
        setThemeState(theme)

        const inversion = localStorage.inversion == "true" ? true : false

        if (!inversion) {
            document.documentElement.style.setProperty("--inv", 0)
        } else {
            document.documentElement.style.removeProperty("--inv")
        }

        setInversionState(inversion)
    }, [])



    const changeInversion = (state) => {
        if (!state) {
            document.documentElement.style.setProperty("--inv", 0)
        } else {
            document.documentElement.style.removeProperty("--inv")
        }
        localStorage.setItem("inversion", state)
        
        setInversionState(state)
    }


    const changeTheme = (theme) => {
        setThemeState(theme)
        document.documentElement.setAttribute("theme", theme)

        const meta = document.querySelector("meta[name=theme-color]")
        meta.content = getComputedStyle(document.documentElement).getPropertyValue("--bg2")

        localStorage.theme = theme
        
    }


    const logout = () => {
        localStorage.user = null
        window.location.reload()
    }


    return (
        <UI
            logout={logout}
            inversion={inversionState}
            theme={themeState}
            changeInversion={changeInversion}
            changeTheme={changeTheme}
        />
    )
}

export default Settings