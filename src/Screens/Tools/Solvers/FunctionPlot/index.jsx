import React, { useLayoutEffect, useRef, useState } from 'react'

import NumInput from '../../NumInput'
import functionPlot from 'function-plot'

import "./style.scss"


const FunctionPlot = (props) => {
    const [func, setFunc] = useState(null)
    const plot = useRef(null)



    useLayoutEffect(() => {
        functionPlot({
            title: 'y = x²',
            data: [{
                fn: 'x^2'
            }],
            grid: true,
            target: plot.current
        })
    })


    return (
        <div className="FunctionPlot">
            <div className="plot" ref={plot}></div>
        </div>
    )
}

FunctionPlot.propTypes = {

}

export default FunctionPlot