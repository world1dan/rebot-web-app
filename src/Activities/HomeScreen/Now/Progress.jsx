import React from "react"
import PropTypes from "prop-types"

import { motion } from "framer-motion"
import { convertTime } from "./utils"



const Progress = ({
    percents,
    size = 82,
    timeLeft,
    strokeColor
}) => {

    const radius = 45
    const circumference = Math.ceil(2 * Math.PI * radius)

    const fillPercents = Math.abs(
        Math.ceil((circumference / 100) * (percents - 100))
    )

    const transition = {
        duration: 1,
        ease: "easeOut"
    }
  
    const variants = {
        hidden: {
            strokeDashoffset: circumference,
            transition
        },
        show: {
            strokeDashoffset: fillPercents,
            transition
        }
    }
  
    return (

        <div className="Progress">
            <div
                className="countdown">
                { convertTime(timeLeft) }
            </div>
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
            >
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="circle"
                    strokeWidth={7}
                    stroke="var(--bg2)"
                    strokeOpacity={1}
                    fill="transparent"
                />
            </svg>
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
                style={{
                    position: "absolute",
                    transform: "rotate(-90deg)",
                    overflow: "visible",
                    marginLeft: -size
                }}
            >
                <motion.circle
                    cx="50"
                    cy="50"
                    r={radius}
                    strokeWidth={9}
                    stroke={strokeColor}
                    fill="transparent"
                    strokeDashoffset={fillPercents}
                    strokeDasharray={circumference}
                    variants={variants}
                    initial="hidden"
                    animate={"show"}
                />
            </svg>
        </div>
    
    )
}


Progress.propTypes = {
    percents: PropTypes.number.isRequired,
    size: PropTypes.number,
    timeLeft: PropTypes.number.isRequired,
    strokeColor: PropTypes.string.isRequired
}

export default Progress