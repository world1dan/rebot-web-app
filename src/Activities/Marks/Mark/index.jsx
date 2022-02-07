import { useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'

import AboutMark from './AboutMark'

import './style.scss'

const Mark = ({
    mark,
    customClickHandler,
    animate,
    unclickable,
    quarter,
    isYearMark,
}) => {
    const [aboutMark, setAboutMark] = useState(false)

    const markNum = mark.mark
    const markStyle = {}

    if (markNum >= 7) {
        markStyle.color = 'var(--mark-green)'
        markStyle.background = 'var(--mark-green-bg)'
    } else if (markNum >= 5) {
        markStyle.color = 'var(--mark-yellow)'
        markStyle.background = 'var(--mark-yellow-bg)'
    } else if (markNum >= 1) {
        markStyle.color = 'var(--mark-red)'
        markStyle.background = 'var(--mark-red-bg)'
    }

    if (mark.imp) {
        markStyle.border = `${markStyle.color} 2px solid`
    }

    const closeAboutMark = () => {
        setAboutMark(false)
    }

    const handleClick = () => {
        if (customClickHandler) {
            customClickHandler()
        } else if (!unclickable) {
            setAboutMark(true)
        }
    }

    return (
        <>
            {animate ? (
                <motion.div
                    className="Mark"
                    style={markStyle}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={handleClick}
                >
                    {mark.mark}
                </motion.div>
            ) : (
                <div className="Mark" style={markStyle} onClick={handleClick}>
                    {mark.mark}
                </div>
            )}
            {!unclickable && !customClickHandler && aboutMark && (
                <AboutMark
                    mark={mark}
                    markStyle={markStyle}
                    handleClose={closeAboutMark}
                    quarter={quarter}
                    isYearMark={isYearMark}
                />
            )}
        </>
    )
}

Mark.propTypes = {
    mark: PropTypes.object.isRequired,
    unclickable: PropTypes.bool,
    customClickHandler: PropTypes.func,
    animate: PropTypes.bool,
}

export default Mark
