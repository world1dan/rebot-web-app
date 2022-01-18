import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { SubjectMarkContext } from './SubjectMarksContext'

import NewMark from './NewMark'
import Mark from 'Activities/Marks/Mark'



const MarksList = ({ marks, subject, readOnly, addQuarterMark }) => {

    const marksComponents = marks?.map((mark) => (
        <Mark 
            mark={mark} 
            key={mark.time} 
            subject={subject}
            readOnly={readOnly}

        />
    ))

    return (
        <> 
            { marksComponents.length != 0 && (
                <SubjectMarkContext.Provider value={marks}>
                    { marksComponents }
                </SubjectMarkContext.Provider>
            )}
            { !readOnly && <NewMark subject={subject} addQuarterMark={addQuarterMark}/> }
        </>
    )
}


MarksList.propTypes = {
    marks: PropTypes.array.isRequired
}


export default memo(MarksList)
