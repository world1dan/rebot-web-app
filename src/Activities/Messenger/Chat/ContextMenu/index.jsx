import React, { useRef } from "react"
import Backdrop from "../../../../Components/Backdrop"


import "./style.scss"


export default function ContextMenu(props) {

    const menu = useRef(null)

    const handleClose = () => {
        
        menu.current.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 120,
            fill: "both"
        }).onfinish = props.onClose
    }


    return (
        <Backdrop onClick={handleClose} active>
            <div className="ContextMenu" ref={menu}>{props.children}</div>
        </Backdrop>
    )
}
