
import { ConfigContext } from "../../Context"
import PropTypes from "prop-types"
import React, { useContext, useEffect, useRef } from "react"



const StatusBar = (props) => {
    const setStatusBar = useContext(ConfigContext).setStatusBar
    const ref = useRef(null)
    useEffect(() => {
        setTimeout(() => {
            ref.current.animate([
                {
                    transform: "translateY(0)"
                },
                {
                    transform: "translateY(100%)"
                }
            ], {
                duration: 200,
                fill: "forwards"
            }).onfinish = () => {
                setStatusBar(false)
            }
        }, 2000)
    }, [])

    return (
        <div className="Navigation-StatusBar" ref={ref}>
            { props.type === 'sucsess' && <i className="fas fa-check-circle sucsess"></i> }
            <div className="title">{ props.title }</div>
        </div>
    )
}


StatusBar.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired
}



export default StatusBar