import React, { useState, useRef } from "react"
import PropTypes from "prop-types"

import "./style.scss"



const ContextMenu = (props) => {

    const [open, setOpen] = useState(false)

    const menu = useRef()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        
        menu.current.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 120,
            fill: "both"
        }).onfinish = () => setOpen(false)
    }



    return (
        <div className="context-menu">
            <button 
                className={"context-menu-btn" + (open ? " active" : "")} 
                onClick={handleOpen}
                onBlur={handleClose}
                onMouseOut={window.ios ? handleClose : null}>
                { props.icon ?? <i className="fas fa-ellipsis-v"></i> }
            </button>

            { open && 
            <div className="menu-items-wraper">
                <div className="menu-items" ref={menu}>
                    {props.children}
                </div>
            </div> }
        </div>
    )
}



ContextMenu.propTypes = {
    icon: PropTypes.node,
    children: PropTypes.node
}



export default ContextMenu
