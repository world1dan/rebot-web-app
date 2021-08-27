import React from "react";
import PropTypes from 'prop-types';

function Switch(props) {
    return (
        <div className="switch block">
            { props.icon }
            <div className="label-block">
                <a className="title">{ props.title }</a>
                <a className="descr">{ props.descr }</a>
            </div>
            <label className="ios7-switch">
                <input type="checkbox" checked={props.checked} onChange={props.onChange}/>
                <span></span>
            </label>
        </div>
    )
}

Switch.protoTypes = {
    title: PropTypes.string.isRequired,
    descr: PropTypes.string,
    icon: PropTypes.element,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

export default Switch;