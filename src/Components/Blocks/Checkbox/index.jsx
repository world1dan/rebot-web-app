import React from 'react'
import PropTypes from 'prop-types'

import css from "./style.module.scss"




const Checkbox = ({ onChange, checked, label }) => {
    return (
        <div className={css.wrapper}>
            <input 
                className={css.checkbox} 
                type="checkbox" 
                id="color-1"
                onChange={onChange}
                value={checked}
            />
            <label htmlFor="color-1">{ label }</label>
        </div>
    )
}


Checkbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string
}


export default Checkbox
