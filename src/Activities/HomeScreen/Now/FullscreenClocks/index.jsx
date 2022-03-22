import { css } from '@linaria/core'
import { motion } from 'framer-motion'

import CloseButton from './CloseButton'
import Time from './Time'
import Progress from '../Progress'
import ModalPortal from '../../../../Components/ModalPortal'

const styles = css`
    background: var(--bg2-translucent);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    z-index: 999;
    padding: 20px;
    display: grid;
    grid-template-rows: 90px 1fr 100px;
    justify-content: center;
    padding-bottom: calc(30px + var(--bottom-save-zone));
    align-items: center;
`

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
}

const FullscreenClocks = ({ handleClose, actualLesson, strokeColor }) => {
    return (
        <ModalPortal>
            <motion.div
                className={styles}
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{
                    bounce: 0,
                    duration: 0.35,
                    type: 'tween',
                    ease: [0.1, 0.76, 0.55, 0.9],
                }}
                drag="y"
                dragConstraints={{ bottom: 0 }}
                dragSnapToOrigin
                dragElastic={{ top: 1, bottom: 0 }}
                dragMomentum={false}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.y, velocity.y)

                    if (swipe < -swipeConfidenceThreshold) {
                        handleClose()
                    }
                }}
            >
                <Time />
                <motion.div
                    className="progress"
                    initial={{ scale: 0.7, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        delay: 0.35,
                    }}
                >
                    <Progress
                        actualLesson={actualLesson}
                        strokeColor={strokeColor}
                        size={220}
                    />
                </motion.div>
                <CloseButton handleClick={handleClose} />
            </motion.div>
        </ModalPortal>
    )
}

export default FullscreenClocks
