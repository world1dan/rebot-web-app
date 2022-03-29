import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
            getComputedStyle(document.documentElement).getPropertyValue('--text1').trim(),
        ],
        transition: {
            color: {
                delay: 0.8,
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

    if (localStorage.getItem('reducedAnimation') == 'true') {
        return <div>{number}</div>
    }

    return (
        <AnimatePresence initial={false}>
            <motion.div
                key={number}
                custom={delta}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {number}
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimatedNum
