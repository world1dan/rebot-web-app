import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Average = (props) => {
    const sumInQuarters = {}
    const countInQuarters = {}

    let yearMarksSum = 0
    let subjectsWithYearMark = 0

    for (let subject in props.marks) {
        const marks = props.marks[subject]

        let count = 0
        let sum = 0

        for (let i = 1; i <= 4; i++) {
            if (marks[i]) {
                count += 1
                sum += marks[i]
                sumInQuarters[i] = (sumInQuarters[i] ?? 0) + marks[i]
                countInQuarters[i] = (countInQuarters[i] ?? 0) + 1
            }
        }

        let average = sum / count

        if (average) {
            average = Math.round(Number(average.toFixed(2)))
            yearMarksSum += average
            subjectsWithYearMark += 1
        }
    }

    const quarterMarksComponents = []

    for (let i = 1; i <= 4; i++) {
        let average = sumInQuarters[i] / countInQuarters[i]

        if (average) {
            average = Number(average.toFixed(2))

            quarterMarksComponents.push(
                <div className="Mark" key={i}>
                    {average}
                </div>
            )
        } else {
            quarterMarksComponents.push(<div key={i}></div>)
        }
    }

    let globalAverage = yearMarksSum / subjectsWithYearMark

    if (!isNaN(globalAverage)) {
        globalAverage = parseInt(globalAverage.toFixed(2))
    } else {
        globalAverage = null
    }

    return (
        <div className="YearSubjectMarks average">
            <div></div>
            <h5 className="subject-title">Средний балл</h5>
            {quarterMarksComponents}
            <div className="year-mark">{globalAverage}</div>
        </div>
    )
}

Average.propTypes = {
    marks: PropTypes.object.isRequired,
}

export default Average
