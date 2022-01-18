import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"

import "./style.scss"
import fixScroll from "../../Utils/fixScroll"


const VScroll = (props) => {


    const ref = useRef(null)


    useEffect(() => {
        if (window.ios && ref?.current) {
            fixScroll(ref.current)
        }
    }, [])
    

    return (
        <div className="VScroll__Wraper">
            <div className="VScroll" ref={ref}>
                { props.children }
            </div>
        </div>
    )
}




VScroll.propTypes = {
    children: PropTypes.node
}


export default VScroll