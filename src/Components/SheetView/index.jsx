import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import ModalPortal from '../ModalPortal'
import Backdrop from '../Backdrop'
import { AnimatePresence } from 'framer-motion'
import CloseBtn from './CloseBtn'
import VScroll from '../VScroll'
const Sheet = styled(motion.div)`
    @keyframes adaptive-panel-in {
        from {
            transform: translateY(calc(100vh - 80px));
        }

        to {
            transform: translateY(0);
        }
    }

    position: fixed;
    right: 0;
    bottom: -100px;
    z-index: 999;
    overflow: hidden;
    color: var(--text1);
    background-color: var(--bg2);
    touch-action: none;
    will-change: transform;

    top: ${(p) => (p.type == 'fullHeightOnMobile' ? 0 : '50px')};
    left: 0;

    border-radius: ${(p) =>
        p.type == 'fullHeightOnMobile' ? 0 : '13px 13px 0 0'};
    animation: adaptive-panel-in 440ms cubic-bezier(0.38, 0.7, 0.125, 1);

    @media (min-width: 700px) {
        top: 28px !important;
        border-radius: 13px 13px 0 0;
        width: ${(p) =>
            p.type !== 'wide'
                ? 'clamp(550px, 70%, 700px)'
                : 'clamp(700px, 94%, 1000px)'};
        margin: 0 auto;
    }

    padding-bottom: 100px;
`

const SheetView = ({ children, handleClose, type }) => {
    const [isVisible, setIsVisible] = useState(true)
    const ref = useRef(null)
    const closeSheet = () => setIsVisible(false)

    useEffect(() => {
        if (!isVisible) {
            ref.current.animate([{ transform: 'translateY(100vh)' }], {
                duration: 220,
                easing: 'ease-in',
                fill: 'forwards',
            })
        }
    }, [isVisible])

    return (
        <ModalPortal>
            <AnimatePresence onExitComplete={handleClose}>
                {isVisible && (
                    <Backdrop onClick={closeSheet}>
                        <Sheet ref={ref} type={type}>
                            <VScroll>{children}</VScroll>
                            <CloseBtn onClick={closeSheet} />
                        </Sheet>
                    </Backdrop>
                )}
            </AnimatePresence>
        </ModalPortal>
    )
}

export default SheetView

/*

import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import useTransition from "../../Hooks/useTransition"

import { useMediaQuery } from "react-responsive"
import Backdrop from "../Backdrop"



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

        if (!props.direction || props.direction === "bottom" || props.direction === "split" || props.direction === "bottom-wide") {
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

        const topContainer = document.getElementById("modals-container")

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

        const topContainer = document.getElementById("modals-container")

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
                onTouchStart={props.scrollContainer ? startTouch : null}
                onTouchMove={props.scrollContainer ? moveTouch : null}
                className={"adaptive-panel" + (props.direction == "right" ? " fullscreen-right" : " bottom") + (props.direction == "bottom-wide" ? " wide" : '')}>

                <header style={{ background: canSplit || props.direction == "right" ? "" : "none"}} className={props.direction == "right" ? "fullscreen" : ""}>
                    { canSplit && splitSide != "left" && <button className="split-left" onClick={() => split("left")}>
                        <i className="fas fa-caret-left"></i>
                    </button> }
                    { canSplit && splitSide != "right" &&  <button className="split-right" onClick={() => split("right")}>
                        <i className="fas fa-caret-right"></i>
                    </button> }
                    { props.direction !== "right" && <button className="close" onClick={closePanel}>
                        <i className="fa-solid fa-xmark"></i>
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



*/
