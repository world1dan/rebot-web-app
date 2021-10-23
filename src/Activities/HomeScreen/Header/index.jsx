import React from "react"
import PropTypes from "prop-types"

import Time from "./Time"
import Rings from "./Rings"

import "./style.scss"



const Header = (props) => {
    return (
        <header className="homescreen-header">
            <Time/>
            <button onClick={() => props.setSettingsOpen(true)}>
                <i className="fas fa-cog"></i>
            </button>
            <Rings/>
        </header>
    )
}



Header.propTypes = {
    setSettingsOpen: PropTypes.func.isRequired
}


export default Header