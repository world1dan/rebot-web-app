import React from "react"
import PropTypes from "prop-types"


import "./style.scss"



const Button = ({ text, onClick }) => {


    return (
        <button className="_Button" onClick={onClick}>
            { text }
        </button>
    )
}

export default Button