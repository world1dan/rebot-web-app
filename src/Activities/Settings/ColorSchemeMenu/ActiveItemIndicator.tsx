import { FC } from 'react'
import { css } from '@linaria/core'

import { motion } from 'framer-motion'

const styles = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px var(--indigo) solid;
    will-change: transform;
    border-radius: 50%;

    z-index: 99;
`

const ActiveItemIndicator: FC = () => {
    return (
        <motion.div
            className={styles}
            layout="position"
            layoutId="active-color-scheme-indicator"
        ></motion.div>
    )
}

export default ActiveItemIndicator
