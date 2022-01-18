import React from "react"
import PropTypes from "prop-types"

import { motion } from 'framer-motion'

import "./style.scss"



const SegmentedControl = ({ items, activeItem, onChange }) => {

    return (
        <motion.ol className={"SegmentedControl"} layout>
            { items.map((item) => {
                const isActive = item.id === activeItem

                return (
                    <motion.li
                        className="item"
                        whileTap={isActive ? { scale: 0.95 } : { opacity: 0.6 }}
                        key={item.id}
                    >
                        <button onClick={() => onChange(item.id)} className="button">
                            { isActive && 
                                <motion.div 
                                    layoutId="active" 
                                    className="active"
                                    transition={{
                                        duration: 0.25
                                    }}/>}
                            <span className="label">{item.title}</span>
                        </button>
                    </motion.li>
                )
            }) }
        </motion.ol>
    )
}


SegmentedControl.propTypes = {
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    activeItem: PropTypes.string.isRequired
}



export default SegmentedControl