import PropTypes from "prop-types"
import React from "react"

import { css } from "@linaria/core"
import { motion } from "framer-motion"


const buttonStyles = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1px;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 2px;
    color: var(--tab-bar-btn);
    font-weight: 500;
    transition: color 0.2s;
    cursor: pointer;

    span {
        display: none;
    }

    @media (min-width: 700px) {
        flex-direction: row;
        gap: 10px;
        justify-content: center;

        span {
            display: inline-block;
            font-size: 14px;
            font-weight: 600;
        }
    }

    &.active {
        color: var(--tab-bar-btn-active);
        transition: color 0.25s;
        animation: navBtn 0.25s;
    }
`


const Button = ({ handleClick, active, icon, title }) => {

    return (
        <motion.button
            onClick={handleClick}
            whileTap={{ scale: 0.93 }}
            className={buttonStyles + (active ? ' active' : '')}
        >
            {icon}
            <span>{title}</span>
        </motion.button>
    )
}



Button.propTypes = {
    handleClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
}



export default Button