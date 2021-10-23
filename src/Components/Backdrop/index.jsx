import React, { forwardRef } from "react"

import "./style.css"


export default forwardRef( function Backdrop(props, ref) {
    return (
        <>
            { props.children }
            <div
                ref={ref}
                onClick={ props.onClick }
                className={ props.active ? "backdrop" : ""}
            />
        </>
    )
})

