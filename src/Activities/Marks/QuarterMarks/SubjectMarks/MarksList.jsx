import { memo } from 'react'

import { SubjectMarkContext } from './SubjectMarksContext'

import Mark from 'Activities/Marks/Mark'

const MarksList = ({ marks, subject, readOnly }) => {
    const marksComponents = marks.map((mark) => (
        <Mark mark={mark} key={mark.time} />
    ))

    return (
        <>
            {marksComponents.length != 0 && (
                <SubjectMarkContext.Provider
                    value={{ marks, subject, readOnly }}
                >
                    {marksComponents}
                </SubjectMarkContext.Provider>
            )}
        </>
    )
}

export default memo(MarksList)
