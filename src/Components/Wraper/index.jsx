import React from "react"
import VScroll from "../VScroll"

import "./style.scss"


const Wraper = (props) => {

    return (
        <VScroll>
            <div className="tab-wraper" style={props.styles}>
                { props.children }
            </div>
        </VScroll>
    )
}

export default Wraper