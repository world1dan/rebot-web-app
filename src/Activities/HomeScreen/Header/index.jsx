import React, { useState } from "react"

import Time from "./Time"
import Rings from "./Rings"

import AdaptivePanel from "Components/AdaptivePanel"
import Settings from "Activities/Settings"

import "./style.scss"



const Header = () => {
    const [settingsOpen, setSettingsOpen] = useState(false)

    return (
        <>
        <header className="homescreen-header">
            <Time/>
            <button onClick={() => setSettingsOpen(true)}>
                <i className="fas fa-cog"></i>
            </button>
            <Rings/>
        </header>

        {settingsOpen && (
            <AdaptivePanel handleClose={() => setSettingsOpen(false)}>
                <Settings />
            </AdaptivePanel>
        )}
        </>
    )
}




export default Header