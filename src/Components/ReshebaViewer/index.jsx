import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import getSolutionImgs from './getSolutionImgs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.scss'
import {
    faChevronLeft,
    faChevronRight,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'

const ReshebaViewer = ({ subjectInfo, startNum, onClose }) => {
    const [num, setNum] = useState(startNum)

    const imgs = useMemo(
        () => getSolutionImgs(subjectInfo, num),
        [subjectInfo, num]
    )

    const openAlt = () => {
        const altUrl = subjectInfo.alt_url.replace(
            '?',
            subjectInfo.section && subjectInfo.title == 'Физика' ? num + 2 : num
        )

        window.open(altUrl, '_blank')
    }

    return (
        <>
            <div className="hwr-sol-tools">
                {subjectInfo.alt_url && (
                    <button className="alt-btn block" onClick={openAlt}>
                        Решебник 2
                    </button>
                )}
                <div className="center-section block">
                    <button onClick={() => setNum(num - 1)}>
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    </button>

                    <button className="num">{num}</button>

                    <button onClick={() => setNum(num + 1)}>
                        <FontAwesomeIcon icon={faChevronRight} size="lg" />
                    </button>
                </div>
                {onClose && (
                    <button className="block close-btn" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                )}
            </div>
            <div className="hwr-sol-imgs">{imgs}</div>
        </>
    )
}

ReshebaViewer.propTypes = {
    subjectInfo: PropTypes.object.isRequired,
    startNum: PropTypes.number.isRequired,
    onClose: PropTypes.func,
}

export default ReshebaViewer
