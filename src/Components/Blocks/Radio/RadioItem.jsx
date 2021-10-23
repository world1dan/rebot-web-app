import React from "react"
import PropTypes from "prop-types"


import "./style.scss"


const RadioItem = ({ title, id, onSelect, selected }) => {

    return (
        <button className={"Item" + (selected ? " selected" : "")} onClick={onSelect}>{ title }</button>
    )
}

export default RadioItem