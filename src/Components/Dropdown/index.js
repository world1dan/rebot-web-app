import React, { useState, useRef } from "react"


import "./style.scss"


export default function Dropdown(props) {

    const [open, setOpen] = useState(false)

    const menu = useRef(null)

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
        <div className={"dropdown " + (props.custom ? "custom" : "")}>
            <button 
                className="menuBtn" 
                onClick={handleOpen}
                onBlur={handleClose}
                onMouseOut={window.ios ? handleClose : () => {}}>
                { props.icon ?? <i className="fas fa-ellipsis-v"></i> }
            </button>

            { open && <div className="dropdown-content" ref={menu}>{props.children}</div> }
        </div>
    )
}
