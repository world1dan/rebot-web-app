import React from "react";
import PropTypes from 'prop-types';

function Button(props) {
    return (
        <div className="switch panel-element" onClick={props.onClick}>
            { props.icon }
            <div className="label-block">
                <a className="title">{ props.title }</a>
                <a className="descr">{ props.descr }</a>
            </div>
            <i className="fas fa-chevron-right"></i>
        </div>
    )
}

Button.protoTypes = {
    title: PropTypes.string.isRequired,
    descr: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func
}

export default Button;