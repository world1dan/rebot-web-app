import React from "react"
import PropTypes from "prop-types"

import "./style.scss"


const Switch = ({ title, icon, descr, checked, onChange }) => {

    return (
        <div className="_Switch">
            { icon }
            <div className="label-block">
                <a className="title">{ title }</a>
                <a className="descr">{ descr }</a>
            </div>
            <label className="ios7-switch">
                <input type="checkbox" checked={ checked } onChange={onChange}/>
                <span></span>
            </label>
        </div>
    )
}


Switch.propTypes = {
    title: PropTypes.string.isRequired,
    descr: PropTypes.string,
    icon: PropTypes.element,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}


export default Switch