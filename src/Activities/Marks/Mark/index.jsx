import React, { useState, memo } from "react"
import PropTypes from "prop-types"

import { AnimatePresence, motion } from "framer-motion"

import About from "./About"

import "./style.scss"



const Mark = (props) => {
    const [aboutMark, setAboutMark] = useState(false)

    const markNum = props.mark.mark
    const markStyle = {}

    if (markNum >= 7) {
        markStyle.color = "var(--mark-green)"
        markStyle.background = "var(--mark-green-bg)"
    } else if (markNum >= 5) {
        markStyle.color = "var(--mark-yellow)"
        markStyle.background = "var(--mark-yellow-bg)"
    } else if (markNum >= 1) {
        markStyle.color = "var(--mark-red)"
        markStyle.background = "var(--mark-red-bg)"
    }

    if (props.mark.imp) {
        markStyle.border = `${markStyle.color} 2px solid`
    }
    

    const handleClick = () => {
        if (props.handleClick) {
            props.handleClick()
        } else if (!props.unclickable) {
            setAboutMark(true)
        }
    }

    const closeAboutMark = () => {
        setAboutMark(false)
    }


    return (
        <>
            { props.animate ? 
                <motion.div 
                    className="Mark" 
                    style={markStyle}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={handleClick}
                >
                    { props.mark.mark }
                </motion.div> 
                :
                <div 
                    className="Mark" 
                    style={markStyle} 
                    onClick={handleClick}
                >
                    { props.mark.mark }
                </div>
            }

            { !props.unclickable && 
                <AnimatePresence>
                    { aboutMark &&
                        <About
                            quarter={props.quarter}
                            subject={props.subject}
                            mark={props.mark}
                            yearMark={props.yearMark}
                            markStyle={markStyle}
                            onClose={closeAboutMark}
                            readOnly={props.readOnly}
                        />
                    }
                </AnimatePresence> 
            }
        </>
    )
}


Mark.propTypes = {
    mark: PropTypes.object.isRequired,
    yearMark: PropTypes.bool,
    subject: PropTypes.object,
    quarter: PropTypes.any,
    unclickable: PropTypes.bool,
    readOnly: PropTypes.bool,
    handleClick: PropTypes.func,
    animate: PropTypes.bool
}


export default memo(Mark)
