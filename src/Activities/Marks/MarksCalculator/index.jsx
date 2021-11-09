import React from "react"
import PropTypes from "prop-types"

import "./style.scss"


const MarksCalculator = (props) => {



    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    const newMarkBtns = nums.map((mark) => {
        return (
            <button className="new-mark-btn" key={mark}>{ mark }</button>
        )
    })


    return (
        <div className="MarksCalculator">
            <h1 className="average-mark">2</h1>
            <div className="marks-display">
                <div className="info">Оценки, которые уже есть</div>

                <div className="marks-container">
                    <div className="mark">1</div>
                    <div className="mark">10</div>
                    <div className="mark">9</div>
                    <div className="mark">3</div>
                    <div className="mark">6</div>
                </div>

                <div className="info">Добавленные оценки</div>

                <div className="marks-container added">
                    <div className="mark">1</div>
                    <div className="mark">10</div>
                    <div className="mark">9</div>
                </div>

                <div className="mark">

                </div>
            </div>
            <div className="marks-input-container">
                { newMarkBtns }
            </div>
        </div>
    )
}



MarksCalculator.propTypes = {
    marks: PropTypes.string.isRequired,
    subject: PropTypes.object.isRequired
}



export default MarksCalculator