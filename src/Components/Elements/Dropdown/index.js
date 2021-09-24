import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import "./style.scss"

export default function Dropdown(props) {

    const [open, setOpen] = useState(false);

    return (
        <div className={"dropdown " + (props.custom ? "custom" : "")}>
            <button 
                className="menuBtn" 
                onClick={() => setOpen(!open)}
                onBlur={() => setOpen(false)}
                onMouseOut={() => window.ios && setOpen(false)}>
                { props.icon ? props.icon : <i className="fas fa-ellipsis-v"></i> }
            </button>

            <CSSTransition in={open} timeout={{ enter: 200, exit: 160 }} classNames='dropdown-content' unmountOnExit>
                <div className="dropdown-content">{props.children}</div> 
            </CSSTransition>
        </div>
    );
}
