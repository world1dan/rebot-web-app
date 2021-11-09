import React from "react"
import PropTypes from "prop-types"

import "./style.scss"


const MarksInput = (props) => {

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    const newMarkBtns = nums.map((mark) => {
        return (
            <button className="new-mark-btn" key={mark} onClick={() => props.handleMarkInput(mark)}>{ mark }</button>
        )
    })


    return (
        <div className="marks-input-container">
            { newMarkBtns }
        </div>
    )
}



MarksInput.propTypes = {
    handleMarkInput: PropTypes.func.isRequired
}



export default MarksInput