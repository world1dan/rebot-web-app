import React from "react"

import "./style.scss"




const ContextMenuBtn = ({ onClick, title, icon }) => {

    return (
        <button className="context-menu-variant" onClick={onClick}>
            { icon }
            <span>{ title }</span>
        </button>
    )
}




export default ContextMenuBtn