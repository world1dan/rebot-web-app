import React from "react"


import VScroll from "../VScroll"

import "./style.scss"


const Wraper = ({ children, styles }) => {

    return (
        <VScroll>
            <div className="tab-wraper" style={styles}>
                { children }
            </div>
        </VScroll>
    )
}

export default Wraper