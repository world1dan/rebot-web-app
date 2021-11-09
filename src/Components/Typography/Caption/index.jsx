import React from "react"
import PropTypes from "prop-types"


import "./style.scss"


const Caption = ({ text }) => {
    return (
        <div className="Caption">{ text }</div>
    )
}

export default Caption