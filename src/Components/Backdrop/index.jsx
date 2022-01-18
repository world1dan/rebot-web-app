import React, { forwardRef } from "react"
import { createPortal } from "react-dom"
import "./style.css"


export default forwardRef( function Backdrop(props, ref) {

    return (
        createPortal(
            <>
                { props.children }
                <div
                    ref={ref}
                    onClick={ props.onClick }
                    className={ props.active ? "backdrop" : ""}
                />
            </>,
            document.getElementById("modals-container")
        )
    )
})

