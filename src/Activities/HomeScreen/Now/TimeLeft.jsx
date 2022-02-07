import { css } from '@linaria/core'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import FullscreenClocks from './FullscreenClocks'

import Progress from './Progress'
const styles = css`
    align-items: center;
    background-color: var(--bg3);
    border-radius: 7px;
    box-shadow: 0 0 0 0.8px var(--lvl4-borders) inset;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 114px;
`

const TimeLeft = ({ actualLesson, strokeColor }) => {
    const [fullscreenClocks, setFullscreenClocks] = useState(false)

    const handleClick = () => setFullscreenClocks(true)
    const handleClose = () => setFullscreenClocks(false)
    return (
        <>
            <div className={styles} onClick={handleClick}>
                <Progress
                    actualLesson={actualLesson}
                    strokeColor={strokeColor}
                />
            </div>
            <AnimatePresence>
                {fullscreenClocks && (
                    <FullscreenClocks
                        isOpen={fullscreenClocks}
                        handleClose={handleClose}
                        actualLesson={actualLesson}
                        strokeColor={strokeColor}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default TimeLeft
