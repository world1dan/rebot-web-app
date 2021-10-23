import React, { forwardRef, useImperativeHandle, useRef, useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"

import DisableScrollSnap from "../../Helpers/DisableEdgeScroll"
import { ConfigContext } from "../../Context"

import "./style.scss"



const VScroll = forwardRef(({ children, reversed, returnBtn }, ref) => {
    const [returnBtnVisible, setReturnBtnVisible] = useState(returnBtn)

    const scrollRef = useRef()
    const returnBtnRef = useRef()
    const config = useContext(ConfigContext)


    useEffect(() => {
        if (config.IS_SAFARI) {
            DisableScrollSnap(scrollRef.current)
        }

    }, [])


    const handleScroll = () => {
        const el = scrollRef.current

        if (el.scrollHeight - el.scrollTop > el.clientHeight) {
            setReturnBtnVisible(true)

        } else if (returnBtnVisible) {
            returnBtnRef.current.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 150,
                fill: "both"
            }).onfinish = () => setReturnBtnVisible(false)
        }
    }


    const scrollToStart = (options) => {
 
        if (reversed) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, ...options })
        } else {
            scrollRef.current.scrollTo({ top: 0, ...options })
        }
    }

    useImperativeHandle(ref, () => ({
        scrollToStart
    }))

    return (
        <div className="VScroll__Wraper">
            <div className="VScroll" ref={scrollRef} onScroll={returnBtn ? handleScroll : null}>
                { children }
            </div>
            { returnBtnVisible && 
            <button className="returnBtn" onClick={() => scrollToStart({ behavior: "smooth" })} ref={returnBtnRef}>
                <svg width="30" height="30" viewBox="0 0 28 28" fill="currentcolor" ><path d="M14 18.4883C14.3076 18.4795 14.5889 18.3652 14.8174 18.1191L21.4971 11.2812C21.6904 11.0879 21.7959 10.8418 21.7959 10.5518C21.7959 9.97168 21.3389 9.50586 20.7588 9.50586C20.4775 9.50586 20.2051 9.62012 20.0029 9.82227L14.0088 15.9834L7.99707 9.82227C7.79492 9.62891 7.53125 9.50586 7.24121 9.50586C6.66113 9.50586 6.2041 9.97168 6.2041 10.5518C6.2041 10.8418 6.30957 11.0879 6.50293 11.2812L13.1914 18.1191C13.4287 18.3652 13.6924 18.4883 14 18.4883Z"/></svg>
            </button> }
        </div>
    )
})

VScroll.displayName = "VScroll"

VScroll.propTypes = {
    children: PropTypes.node,
    reversed: PropTypes.bool,
    returnBtn: PropTypes.bool
}


export default VScroll