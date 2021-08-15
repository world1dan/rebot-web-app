import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import "./style.scss"

export default function Dropdown(props) {

    const [isOpen, setIsOpen] = useState(false);
    const button = useRef();

    function setUnfocusListener() {
        if (isOpen) {
            button.current.addEventListener("blur", () => {
                setIsOpen(false)
            }, {once: true});

            if (window.ios) {
                button.current.addEventListener("mouseout", () => {
                    setIsOpen(false)
                }, {once: true});
            }
        }
    }


    return (
        <div className="dropdown">
            <button ref={button} className="menuBtn" onClick={() => setIsOpen(!isOpen)}>
                <i className="fas fa-ellipsis-v"></i>
            </button>

            <CSSTransition in={isOpen} timeout={300} classNames='dropdown-content' onEnter={setUnfocusListener} unmountOnExit>
                <div className="dropdown-content">{props.children}</div> 
            </CSSTransition>
        </div>
    );
}
