
import PropTypes from "prop-types"
import React from "react"



const NavButton = ({ setActiveTab, isActive, icon, title }) => {
    return (
        <button onClick={setActiveTab} className={"NavButton " + (isActive ? "active" : "")}>
            { icon }
            <span>{ title }</span>
        </button>
    )
}


NavButton.propTypes = {
    setActiveTab: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}



export default NavButton