import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { motion } from "framer-motion";

import { useMediaQuery } from 'react-responsive'
import Backdrop from "../Elements/Backdrop";
import LoadingAnimation from "../Elements/LoadingAnimation";
import "./style.scss";



const slideAnimation = {
    visible: { 
        y: 0,
        transition: { 
            type: "spring",
            bounce: 0.18,
            duration: 0.55
        }
    },

    closed: { 
        y: "100vh",
        transition: {
            duration: 0.25
        }
    }
}

function getSplitAnimation(direction) {
    if (direction == "left" || direction == "right") {
        return ({
            visible: {
                width: "50%",
                margin: 0,
                y: 0,
                x: direction == "left" ? 0 : "50vw",
                borderRadius: 0,
                top: 0,
                transition: {
                    duration: 0.25
                }
            },
        
            closed: { 
                y: "100vh",
                transition: {
                    duration: 0.25
                }
            }
        })
    }
}




const AdaptivePanel = (props) => {
    const canSplit = useMediaQuery({ query: "(min-width: 700px) and (orientation: landscape)" }) && props.direction == "split";

    const [loading, setLoading] = useState(true);
    const [backdrop, setBackdrop] = useState(true);

    const [splitSide, setSplitSide] = useState(null);
    
    const [animationVariants, setAnimationVariants] = useState(slideAnimation);


    useEffect(() => {
        setTimeout(() => setLoading(false), 450);

        
    }, []);


    const handleClose = () => {
        document.body.classList.remove("mini-left", "mini-right");
        props.handleClose();
    }

    const activateLoading = (duration) => {
        setLoading(true);
        setTimeout(() => setLoading(false), duration)
    }

    const split = (direction) => {
        setBackdrop(false)
        setSplitSide(direction);
        activateLoading(500);

        if (direction == "left" || direction == "right") {
            setAnimationVariants(getSplitAnimation(direction));
            document.body.classList.remove("mini-left", "mini-right");
            document.body.classList.add(direction == "right" ? "mini-left" : "mini-right")
        }
    }

    return (
        <Backdrop onClick={handleClose} active={backdrop}>
         <motion.div
                onClick={(e) => e.stopPropagation()}
                className="adaptive-panel"
                initial="closed"
                animate="visible"
                exit="closed"
                variants={animationVariants}> 

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
        </motion.div>
        </Backdrop>
    )
}



AdaptivePanel.propTypes = {
    handleClose: PropTypes.func.isRequired,
    direction: PropTypes.string
}


export default AdaptivePanel;