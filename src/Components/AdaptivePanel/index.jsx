import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import useTransition from "../../Hooks/useTransition"

import { useMediaQuery } from "react-responsive"
import Backdrop from "../Backdrop"


import "./style.scss"


var initialY = null

function getSplitAnimation(to) {
    return (
        {
            transform: `translateX(${to == "left" ? "-50%" : "50%"})`,
            borderRadius: 0,
            top: 0
        }
    )
}


const AdaptivePanel = (props) => {

    const panel = useRef(null)
    const backdrop = useRef(null)

    const canSplit = useMediaQuery({ query: "(min-width: 700px) and (orientation: landscape)" }) && props.direction == "split"
    const startTransition = useTransition(panel)

    const [backdropActive, setBackdropActive] = useState(true)
    const [splitSide, setSplitSide] = useState(null)


    useEffect(() => {
        backdrop.current.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 320,
            fill: "forwards"
        })
    }, [])


    const startTouch = (e) => {
        initialY = e.touches[0].clientY
    }


    const moveTouch = (e) => {
        if (initialY == null) return

        const currentY = e.touches[0].clientY
        const diffY = initialY - currentY

        if (diffY < -8 && props.scrollContainer.current.scrollTop == 0) {
            closePanel()
        }

        initialY = null
    }


    const closePanel = () => {

        if (!props.direction || props.direction === "bottom" || props.direction === "split") {
            startTransition(
                { transform: "translateY(100vh) " + (splitSide == "left" ? "translateX(-50%)" : "" || splitSide == "right" ? "translateX(50%)" : "")},
                { duration: 220, easing: "ease-in" },
                props.handleClose
            )
        } else {
            startTransition(
                { transform: "translateX(100%)" },
                { duration: 220, easing: "ease-in" },
                props.handleClose
            )
        }


        backdrop.current.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 320,
            fill: "forwards",
            easing: "ease-in-out"
        })

        const topContainer = document.getElementById("hw-re-container")

        if (topContainer.childElementCount <= 2) {
            document.body.classList.remove("mini-left", "mini-right")
        } else if (splitSide == "left") {
            document.body.classList.remove("mini-right")
            document.body.classList.add("mini-left")
        } else if (splitSide == "right") {
            document.body.classList.remove("mini-left")
            document.body.classList.add("mini-right")
        }
    }


    function split(to) {
        panel.current.style.width = "50vw"

        startTransition(
            getSplitAnimation(to),
            { duration: 300, easing: "ease-out" }
        )

        const topContainer = document.getElementById("hw-re-container")

        if (topContainer.childElementCount <= 2) {
            document.body.classList.remove("mini-left", "mini-right")
            document.body.classList.add(to == "right" ? "mini-left" : "mini-right")
        }

        setBackdropActive(false)
        setSplitSide(to)
    }


    return (
        <Backdrop active={backdropActive} ref={backdrop} onClick={closePanel}>
            <div
                ref={panel}
                onTouchStart={startTouch}
                onTouchMove={moveTouch}
                className={"adaptive-panel" + (props.direction == "right" ? " fullscreen-right" : " bottom")}>

                <header style={{ background: canSplit || props.direction == "right" ? "" : "none"}} className={props.direction == "right" ? "fullscreen" : ""}>
                    { canSplit && splitSide != "left" && <button className="split-left" onClick={() => split("left")}>
                        <i className="fas fa-caret-left"></i>
                    </button> }
                    { canSplit && splitSide != "right" &&  <button className="split-right" onClick={() => split("right")}>
                        <i className="fas fa-caret-right"></i>
                    </button> }
                    { props.direction !== "right" && <button className="close" onClick={closePanel}>
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="var(--text2)"><path d="M0.32373 11.209C0.0161133 11.5166 0.00146484 12.0659 0.331055 12.3882C0.65332 12.7104 1.20264 12.7031 1.51025 12.3955L5.99268 7.90576L10.4824 12.3955C10.7974 12.7104 11.3394 12.7104 11.6616 12.3882C11.9766 12.0586 11.9839 11.5239 11.6616 11.209L7.1792 6.71924L11.6616 2.23682C11.9839 1.92188 11.9839 1.37988 11.6616 1.05762C11.332 0.742676 10.7974 0.735352 10.4824 1.05029L5.99268 5.54004L1.51025 1.05029C1.20264 0.742676 0.645996 0.728027 0.331055 1.05762C0.00878906 1.37988 0.0161133 1.9292 0.32373 2.23682L4.81348 6.71924L0.32373 11.209Z"/></svg>
                    </button> }
                    { props.direction == "right" && <button className="close-fullscreen" onClick={closePanel}>
                        <svg width="44" height="44" viewBox="0 0 28 28" fill="currentColor"><path d="M8.34863 13.6543C8.34863 13.9619 8.46289 14.2256 8.70898 14.4541L15.5469 21.1514C15.7402 21.3447 15.9863 21.4502 16.2764 21.4502C16.8564 21.4502 17.3223 20.9932 17.3223 20.4043C17.3223 20.1143 17.1992 19.8594 17.0059 19.6572L10.8447 13.6543L17.0059 7.65137C17.1992 7.44922 17.3223 7.18555 17.3223 6.9043C17.3223 6.31543 16.8564 5.8584 16.2764 5.8584C15.9863 5.8584 15.7402 5.96387 15.5469 6.15723L8.70898 12.8457C8.46289 13.083 8.34863 13.3467 8.34863 13.6543Z"/></svg>
                    </button>}
                    { props.direction == "right" && <div className="header-title">{ props.headerTitle }</div> }
                </header>

                { props.children }
            </div>
        </Backdrop>
    )
}



AdaptivePanel.propTypes = {
    handleClose: PropTypes.func.isRequired,
    direction: PropTypes.string,
    headerTitle: PropTypes.string,
    scrollContainer: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.elementType })
    ]),
    children: PropTypes.node
}


export default AdaptivePanel
