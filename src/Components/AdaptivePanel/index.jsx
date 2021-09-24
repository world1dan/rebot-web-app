import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive'
import Backdrop from "../Elements/Backdrop";
import LoadingAnimation from "../Elements/LoadingAnimation";
import "./style.scss";




function getSplitAnimation(to) {
    return (
        {
            width: "50%",
            transform: `translateX(${to == "left" ? "-50%" : "50%"})`,
            borderRadius: 0,
            top: 0,
        }
    )
}


const AdaptivePanel = (props) => {

    const panel = useRef(null);
    const backdrop = useRef(null);

    const canSplit = useMediaQuery({ query: "(min-width: 700px) and (orientation: landscape)" }) && props.direction == "split";

    const [loading, setLoading] = useState(true);
    const [backdropActive, setBackdropActive] = useState(true);

    const [splitSide, setSplitSide] = useState(null);
    const [lastState, setLastState] = useState({});
    

    useEffect(() => {
        panel.current.animate([
            { 
                transform: panel.current.style.transform + " translateY(100vh)",

            },
            { transform: "translateY(0)" }
        ], {
            duration: 450,
            fill: "forwards",
            easing: "cubic-bezier(0.38, 0.7, 0.125, 1)"
            
        });

        backdrop.current.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 320,
            fill: "forwards"
        });

        setTimeout(() => setLoading(false), 460);
    }, []);


    const handleClose = () => {
        document.body.classList.remove("mini-left", "mini-right");
        
        panel.current.animate([
            lastState,
            { transform: "translateY(100vh)" }
        ], {
            duration: 220,
            fill: "both",
            easing: "ease-in"
        }).onfinish = props.handleClose;

        backdrop.current.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 320,
            fill: "forwards",
            easing: "ease-in-out"
        });
    }

    function activateLoading(duration) {
        setLoading(true);
        setTimeout(() => setLoading(false), duration)
    }

    function split(to) {
        setBackdropActive(false);
        setSplitSide(to);
        activateLoading(500);

        if (to == "left" || to == "right") {
            const endState = getSplitAnimation(to);

            panel.current.animate([ lastState, endState ], {
                duration: 300,
                fill: "forwards",
                easing: "ease-out"
            });

            document.body.classList.remove("mini-left", "mini-right");
            document.body.classList.add(to == "right" ? "mini-left" : "mini-right")

            setLastState(endState);
        }
    }


    return (
        <Backdrop active={backdropActive} ref={backdrop} onClick={handleClose}>
         <div
            ref={panel}
            onClick={(e) => e.stopPropagation()}
            className="adaptive-panel"> 

            <header>
                { canSplit && splitSide != "left" && <button className="split-left" onClick={() => split("left")}>
                    <i className="fas fa-caret-left"></i>
                </button> }
                { canSplit && splitSide != "right" &&  <button className="split-right" onClick={() => split("right")}>
                    <i className="fas fa-caret-right"></i>
                </button> }
                <button className="close" onClick={handleClose}>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="var(--text3)"><path d="M0.32373 11.209C0.0161133 11.5166 0.00146484 12.0659 0.331055 12.3882C0.65332 12.7104 1.20264 12.7031 1.51025 12.3955L5.99268 7.90576L10.4824 12.3955C10.7974 12.7104 11.3394 12.7104 11.6616 12.3882C11.9766 12.0586 11.9839 11.5239 11.6616 11.209L7.1792 6.71924L11.6616 2.23682C11.9839 1.92188 11.9839 1.37988 11.6616 1.05762C11.332 0.742676 10.7974 0.735352 10.4824 1.05029L5.99268 5.54004L1.51025 1.05029C1.20264 0.742676 0.645996 0.728027 0.331055 1.05762C0.00878906 1.37988 0.0161133 1.9292 0.32373 2.23682L4.81348 6.71924L0.32373 11.209Z"/></svg>
                </button>
            </header>


            { loading && <LoadingAnimation/> }
            { props.children }
        </div>
        </Backdrop>
    )
}



AdaptivePanel.propTypes = {
    handleClose: PropTypes.func.isRequired
}


export default AdaptivePanel;