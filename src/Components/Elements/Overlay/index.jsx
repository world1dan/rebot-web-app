import React from 'react';
import PropTypes from 'prop-types';

import "./style.css";

function Overlay({ children, onClick }) {
    return (
        <>
        <div className="Overlay" onClick={onClick}></div>

        { children }
        </>
    )
}

Overlay.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired
}


export default Overlay;