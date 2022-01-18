import React, { useRef } from 'react'
import PropTypes from "prop-types"

import { motion, AnimatePresence } from "framer-motion"

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



const TabView = (props) => {
    const history = useRef([])




    const currentTab = props.tabs.map((tab, index) => {
        if (tab.id == props.activeTab) {
            history.current.push(index)
            return tab.content
        }
    })


    const prewTabID = history.current[history.current.length-2]
    const nextTabID = history.current[history.current.length-1]

    

    let direction = prewTabID < nextTabID ? 1 : -1

    return (
        <AnimatePresence initial={false} custom={direction}> 
            <motion.div
                className='TabView'
                key={props.activeTab}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "tween", duration: 0.2 },
                }}
            >
                { currentTab }
            </motion.div>
        </AnimatePresence>
    )
}


TabView.propTypes = {
    activeTab: PropTypes.string.isRequired,
    tabs: PropTypes.array,
}


export default TabView
