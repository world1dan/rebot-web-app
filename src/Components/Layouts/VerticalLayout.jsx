import React from "react"
import PropTypes from "prop-types"


import "./style.scss"


const VerticalLayout = ({ children }) => {

    return (
        <div className="_VerticalLayout">
            { children }
        </div>
    )
}

export default VerticalLayout