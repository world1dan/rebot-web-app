import React, { useContext } from 'react'

import { MarksContext } from 'Context'

import MarksView from './MarksView'

import "./style.scss"


const QuarterMarks = () => {
    const marks = useContext(MarksContext)

    return (
        <div className='QuarterMarks'>
            <MarksView marks={marks ?? {}}/>
        </div>
    )
}



export default QuarterMarks
