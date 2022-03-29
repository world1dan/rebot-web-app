import { useState, createContext } from 'react'

import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import Backdrop from '../Backdrop'

import ModalPortal from '../ModalPortal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import './style.css'

export const ActionSheetContext = createContext(null)

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
}

const ActionSheet = ({ onClose, children, bottomCloseBtn }) => {
    const [isVisible, setIsVisible] = useState(true)

    const closeSheet = () => setIsVisible(false)

    const y = useMotionValue(0)

    return (
        <ModalPortal>
            <AnimatePresence onExitComplete={onClose}>
                {isVisible && (
                    <Backdrop onClick={closeSheet} y={y}>
                        <motion.div
                            className="ActionSheet"
                            drag="y"
                            dragConstraints={{ top: 0 }}
                            dragSnapToOrigin
                            dragElastic={0.4}
                            style={{ y }}
                            exit={{
                                y: 'calc(100% + 50px)',
                                transitionEnd: {
                                    display: 'none',
                                },
                                transition: {
                                    type: 'tween',
                                    duration: 0.26,
                                },
                            }}
                            initial={{ y: 200 }}
                            animate={{ y: 0 }}
                            transition={{
                                type: 'tween',
                                ease: [0.38, 0.7, 0.125, 1],
                                duration: 0.3,
                            }}
                            onDragEnd={(_e, { offset, velocity }) => {
                                const swipe = swipePower(offset.y, velocity.y)

                                if (swipe > swipeConfidenceThreshold) {
                                    closeSheet()
                                }
                            }}
                        >
                            <ActionSheetContext.Provider
                                value={{ close: closeSheet }}
                            >
                                {children}
                            </ActionSheetContext.Provider>
                            {bottomCloseBtn ? (
                                <div
                                    className="ActionSheetCloseBtn"
                                    onClick={closeSheet}
                                >
                                    Закрыть
                                </div>
                            ) : (
                                <div
                                    className="top-close-btn"
                                    onClick={closeSheet}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            )}
                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </ModalPortal>
    )
}

export default ActionSheet
