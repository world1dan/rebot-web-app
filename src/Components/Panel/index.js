import React from "react"
import PropTypes from "prop-types"

import { CSSTransition } from "react-transition-group"

import "./style.scss"

function Panel(props) {

    const isActive = props.currentPanel == props.id

    return (
        <CSSTransition 
            in={isActive}
            timeout={500}
            classNames={props.id == "main" ? "view-panel-main" : "view-panel"}
            unmountOnExit>
            <div className='view-panel'>
                { props.children }
            </div>
        </CSSTransition>
    )
}


export default Panel