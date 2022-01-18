import React from 'react';
import PropTypes from 'prop-types';

import { motion } from "framer-motion"

const Switch = ({ checked, onChange }) => {
    return (
        <label className="Switch__Wrapper">
            <input type="checkbox" checked={ checked } onChange={onChange}/>
            <div className={"Switch" + (checked ? " checked" : "")}>
                <motion.div layout className="indicator" transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}></motion.div>
            </div>
        </label>
    )
}


Switch.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
}


export default Switch
