import React from "react"
import PropTypes from "prop-types"


import "./style.scss"


const VerticalLayout = ({ children, noPadding }) => {

    return (
        <div className={"_VerticalLayout" + (noPadding ? " noPadding" : "")}>
            { children }
        </div>
    )
}


VerticalLayout.propTypes = {
    noPadding: PropTypes.bool,
    children: PropTypes.node
}
export default VerticalLayout