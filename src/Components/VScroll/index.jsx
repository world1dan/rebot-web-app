import React from "react"
import PropTypes from "prop-types"

import useScrollFix from "Hooks/useScrollFix"

import "./style.scss"




const VScroll = (props) => {
    const bind = window.ios ? useScrollFix() : {}

    return (
        <div className="VScroll__Wraper">
            <div className="VScroll" {...bind}>
                { props.children }
            </div>
        </div>
    )
}



VScroll.propTypes = {
    children: PropTypes.node
}


export default VScroll


