import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';

import SideViewHeader from './SideViewHeader';

import './style.scss';



function SideView(props) {

    function handleEnter() {
        globalThis.blurListener = (e) => {
            e.stopPropagation();
            props.onClose();
        }
        
        if (props.backgroundRef) {
            props.backgroundRef.current.addEventListener("click", globalThis.blurListener, { once: true });
            props.backgroundRef.current.classList.add("unfocused");
        }
    }

    function handleExit() {
        if (props.backgroundRef) {
            props.backgroundRef.current.classList.remove("unfocused");
            props.backgroundRef.current.removeEventListener("click", globalThis.blurListener);
        }
    }

    
    return (
        <CSSTransition 
            in={props.open} 
            timeout={600}
            classNames='side-view'
            unmountOnExit
            onEnter={handleEnter}
            onExit={handleExit}>
    
            <div className={"side-view " + props.side } id={props.id}>
                <SideViewHeader
                    title={props.title}
                    onClose={props.onClose}
                    side={props.side}
                />
                <div className="side-view-content">
                    { props.children }
                </div>
            </div>
        </CSSTransition>
    )
}


SideView.propTypes = {
    id: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    side: PropTypes.oneOf(['right', 'left']),
    backgroundRef: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.any })
    ])
};


export default SideView

