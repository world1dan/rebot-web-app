import { useRef } from 'react'
import PropTypes from 'prop-types'

import { AnimatePresence, motion } from 'framer-motion'
import { css } from '@linaria/core'

const styles = css`
    align-items: center;
    bottom: 0;
    color: var(--text1);
    display: flex;
    font-size: 42px;
    font-weight: 700;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    will-change: transform opacity;

    @media (max-height: 400px) {
        font-size: 36px;
    }
`
const variants = {
    initial: () => ({
        opacity: 0,
        y: -60,

        position: 'absolute',
    }),
    animate: (markDelta) => ({
        opacity: 1,
        y: 0,
        position: 'static',
        color: [
            markDelta == 'decrease' ? '#ff3b30' : '#34c759',
            getComputedStyle(document.documentElement)
                .getPropertyValue('--text1')
                .trim(),
        ],
        transition: {
            color: {
                delay: 0.3,
            },
        },
    }),
    exit: {
        opacity: 0,
        y: 30,
        scale: 0.4,
        position: 'absolute',
    },
}

const AnimatedNum = ({ number }) => {
    const prewNumber = useRef(null)

    const delta = prewNumber.current > number ? 'decrease' : 'increase'

    prewNumber.current = number

    return (
        <AnimatePresence initial={false}>
            <motion.div
                key={number}
                custom={delta}
                variants={variants}
                initial="initial"
                animate="animate"
                styles={styles}
                exit="exit"
            >
                {number}
            </motion.div>
        </AnimatePresence>
    )
}

AnimatedNum.propTypes = {
    number: PropTypes.number,
}

export default AnimatedNum
