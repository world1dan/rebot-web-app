import {
    AnimatePresence,
    motion,
    useMotionValue,
    useTransform,
} from 'framer-motion'
import CheckCircle from '../Icons/CheckCircle'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'

const Container = styled(motion.div)`
    width: ${(p) => p.size}px;
    background-color: var(--bg4);
    height: ${(p) => p.size}px;
    padding: 7px;
    box-sizing: content-box;
    border-radius: 50%;
    color: var(--green);
`
export const RoundedCheckbox = ({ isChecked, handleChange, size = 20 }) => {
    return (
        <Container
            size={size}
            onClick={() => handleChange(!isChecked)}
            whileTap={{ scale: 0.9 }}
        >
            <AnimatePresence>
                {isChecked && (
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                    >
                        <CheckCircle width={size} height={size}></CheckCircle>
                    </motion.div>
                )}
            </AnimatePresence>
        </Container>
    )
}
