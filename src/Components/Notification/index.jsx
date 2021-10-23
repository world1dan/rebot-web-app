import React from "react"
import PropTypes from "prop-types"


import "./style.scss"
import { createPortal } from "react-dom"



let initialY = null

const Notification = (props) => {

    const handleTouchStart = (e) => {
        initialY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
        if (initialY === null) return

        const currentY = e.touches[0].clientY
        const diffY = initialY - currentY

        if (diffY > 0) {
            e.currentTarget.animate([{
                transform: "translateY(-120px)"
            }], {
                duration: 400,
                ease: "cubic-bezier(0.075, 0.82, 0.165, 1)",
                fill: "both"
            }).onfinish = props.handleClose

        } 

        initialY = null
    }


    return createPortal(
        <div 
            className="Notification"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}>
            <div className="appIcon"> { props.appIcon } </div>
            <div className="content">
                <div className="title">{ props.title }</div>
                <div className="text">{ props.text }</div>
            </div>
            <div className="slider"></div>
        </div>,
        document.getElementById("root")
    )
}





Notification.propTypes = {
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    appIcon: PropTypes.node,
    appName: PropTypes.string
}


export default Notification