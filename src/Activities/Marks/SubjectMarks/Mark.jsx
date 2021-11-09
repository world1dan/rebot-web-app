import React from "react"
import PropTypes from "prop-types"


import "./style.scss"
import useMarkRating from "../useMarkRating"


const Mark = (props) => {

    const { markStyle } = useMarkRating(props.mark.mark)


    return (
        <div className="Mark" style={markStyle} onClick={() => props.removeMark(props.mark)}>
            { props.mark.mark }
        </div>
    )
}





Mark.propTypes = {
    mark: PropTypes.object.isRequired,
    removeMark: PropTypes.func.isRequired
}



export default Mark