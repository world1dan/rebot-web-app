import { memo } from 'react'

import Mark from '../../Mark'

const MarksList = ({ marks }) => {
    return marks.map((mark) => <Mark mark={mark} key={mark.time} />)
}

export default memo(MarksList)
