import React from 'react'

import { getAverage } from 'Activities/Marks/utils'



const AverageMark = ({ marks, target, readOnly, openCalculator, openTargetDialog }) => {

    const average = getAverage(marks)
    const averageMarkStyles = {}

    if (average && (Math.round(average) < parseInt(target))) {
        averageMarkStyles.border = "var(--mark-yellow) 2px solid"
    }

    const averageToDisplay = average ? Number(average.toFixed(2)) : null


    return (
        <div className="average-mark-tools">
            <div 
                className="average-mark" 
                onClick={openCalculator} 
                style={averageMarkStyles}
            >
                { averageToDisplay || <i className="fa-solid fa-circle-question no-mark"></i> }
            </div>
            <div 
                className="mark-target" 
                onClick={readOnly ? undefined : openTargetDialog}
            >
                Цель: { target }
            </div>
        </div>
    )
}



export default AverageMark
