import React from 'react';
import PropTypes from "prop-types";



import "./style.scss";



function AlertButton({ title, onClick, destructive }) {
    return (
        <button
            onClick={onClick}
            className={"AlertButton " + (destructive ? "destructive" : "")}
            whileTap={{ filter: "brightness(1.4)"}}
            >
            { title }
        </button>
    )
}


AlertButton.propTypes = {

}

export default AlertButton;