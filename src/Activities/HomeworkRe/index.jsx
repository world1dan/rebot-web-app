import { useContext } from 'react'
import PropTypes from 'prop-types'

import { manifestContext } from '../../Context'

import Group from './Group'
import SheetView from '../../Components/SheetView'

const HomeworkRe = (props) => {
    const manifest = useContext(manifestContext)

    const groups = []

    for (let subjectNum in props.lessonsData) {
        const lesson = props.lessonsData[subjectNum]

        const subjectInfo = manifest[lesson.id]

        if (!subjectInfo.url) continue

        const toOpen = lesson.hw
            .replace(/ *\([^)]*\) */g, '')
            .split(',')
            .map((numString) => {
                const num = numString
                    .trim()
                    .replace(/[^\d.^\s.]/g, '')
                    .split(' ')
                    .filter((v) => v !== '')[0]

                return parseInt(num)
            })

        groups.push(
            <Group
                key={lesson.id}
                subjectInfo={subjectInfo}
                toOpen={toOpen}
                hwRaw={lesson.hw}
            />
        )
    }

    return <SheetView handleClose={props.handleClose}>{groups}</SheetView>
}

HomeworkRe.propTypes = {
    handleClose: PropTypes.func.isRequired,
    lessonsData: PropTypes.array.isRequired,
}

export default HomeworkRe
