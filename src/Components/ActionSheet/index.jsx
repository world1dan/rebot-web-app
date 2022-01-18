import React from "react"

import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import PropTypes from "prop-types"

import "./style.css"



export const ActionSheetContext = React.createContext(null)

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
}



const BackdropV2 = ({ children, onClick }) => {
    return (
        <>
        <motion.div
            className="BackdropV2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
            transition={{
                type: "tween", duration: 0.3
            }}
        />
        { children}
        </>
    )
}


const ActionSheet = ({ onClose, children, bottomCloseBtn }) => {


    return (
        createPortal(<ActionSheetContext.Provider value={{ close: onClose }}>
            <BackdropV2 onClick={onClose}>
                    <motion.div 
                        className='ActionSheet'
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.4}
                        exit={{
                            y: 'calc(100% + 50px)',
                            transitionEnd: {
                                display: 'none'
                            },
                            transition: {
                                type: "tween", duration: 0.26,
                            }
                        }}
                        initial={{y: "100%"}}
                        animate={{y: 0}}
                        transition={{
                            type: "spring", bounce: 0, duration: 0.32
                        }}

                        onDragEnd={(_e, { offset, velocity }) => {
                            const swipe = swipePower(offset.y, velocity.y)

                            if (swipe > swipeConfidenceThreshold) {
                                onClose()
                            }
                        }}>
        
                        { children }
                        { bottomCloseBtn ? 
                            <div className="ActionSheetCloseBtn" onClick={onClose}>Закрыть</div> :
                            <div className="top-close-btn" onClick={onClose}>
                                <i className="fa-solid fa-xmark"></i>
                            </div> }
                    </motion.div>
            </BackdropV2>
        </ActionSheetContext.Provider>, document.getElementById('modals-container'))
    )
}



ActionSheet.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    bottomCloseBtn: PropTypes.bool
}
export default ActionSheet