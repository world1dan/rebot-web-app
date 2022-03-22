import { useRef } from 'react'
import PropTypes from 'prop-types'

import { AnimatePresence, motion } from 'framer-motion'

const variants = {
    initial: () => ({
        opacity: 0,
        y: -60,
        position: 'static',
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
    exit: { opacity: 0, y: 30, scale: 0.4, position: 'absolute' },
}

const Average = ({ averageMark }) => {
    const prewAverage = useRef(null)

    const markDelta =
        prewAverage.current > averageMark ? 'decrease' : 'increase'

    prewAverage.current = averageMark

    return (
        <div className="average-mark-wraper">
            <AnimatePresence initial={false}>
                <motion.div
                    key={averageMark}
                    custom={markDelta}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    className="average-mark"
                    exit="exit"
                >
                    {averageMark}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

Average.propTypes = {
    averageMark: PropTypes.number,
}

export default Average
