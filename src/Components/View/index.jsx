import React, { useRef } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import "./style.scss"

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? "100%" : "-100%",
            position: "absolute"
        }
    },
    center: {
        x: 0,
        position: "static"
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? "100%" : "-100%",
            position: "absolute"
        }
    }
}



const View = ({ children, currentView }) => {

    const prevPanelNum = useRef(null)
    
    const [ activeView, currentPanelNum ] = React.Children.map(children, (child, i) => {
        if (child.props.id === currentView && currentView) {
            return [child, i]
        }
    })
    
    const direction = prevPanelNum.current < currentPanelNum ? 1 : -1
    

    return (
        <div className='View-wrapper'>
            <AnimatePresence custom={direction} initial={false}>
                <motion.div
                    className="View"
                    key={currentView}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "tween", duration: 0.3 },
                    }}
                >
                    { activeView }
                </motion.div>
            </AnimatePresence>
        </div>
        
    )
}

export default View
