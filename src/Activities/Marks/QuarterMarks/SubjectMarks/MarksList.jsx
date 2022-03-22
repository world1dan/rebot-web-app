import { memo } from 'react'

import Mark from 'Activities/Marks/Mark'

const MarksList = ({ marks }) => {
    const marksComponents = marks.map((mark) => (
        <Mark mark={mark} key={mark.time} />
    ))
    if (marks.length == 0) return null

    return marksComponents
}

export default memo(MarksList)
