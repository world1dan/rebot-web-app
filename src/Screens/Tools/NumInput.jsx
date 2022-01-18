import React from 'react'
import PropTypes from "prop-types"


const NumInput = (props) => {
    return (
        <input 
            className="NumInput" 
            type="number" 
            style={{ width: props.width }}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(e.target.value)}
            value={props.value}>
            
        </input>
    )
}

NumInput.propTypes = {
    width: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string
}

export default NumInput