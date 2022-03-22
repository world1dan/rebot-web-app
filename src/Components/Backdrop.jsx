import { motion } from 'framer-motion'
import { css } from '@linaria/core'

const styles = css`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    touch-action: none;
    background: var(--backdrop);
    z-index: 999;
    cursor: pointer;
`

const Backdrop = ({ children, onClick }) => {
    return (
        <>
            <motion.div
                className={styles}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClick}
                transition={{
                    type: 'tween',
                    duration: 0.3,
                }}
            />
            {children}
        </>
    )
}

export default Backdrop
