import { useContext } from 'react'

import { MarksContext } from '../../../Context'

import MarksView from './MarksView'

const QuarterMarks = () => {
    const marks = useContext(MarksContext) ?? {}

    return <MarksView marks={marks} />
}

export default QuarterMarks
