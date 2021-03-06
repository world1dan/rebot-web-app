import { useState, useMemo } from 'react'

import getSolutionImgs from './getSolutionImgs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.scss'
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import PhotoViewer from '../PhotoViewer'

const ReshebaViewer = ({ subject, startNum, onClose }) => {
    const [num, setNum] = useState(startNum)
    const [photoViewer, setPhotoViewer] = useState(false)

    const imgs = useMemo(() => getSolutionImgs(subject, num), [subject, num])

    const openAlt = () => {
        const altUrl = subject.alt_url.replace(
            '?',
            subject.section && subject.title == 'Физика' ? num + 2 : num
        )

        window.open(altUrl, '_blank')
    }

    return (
        <>
            <div className="hwr-sol-tools">
                {subject.alt_url && (
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
            <div className="hwr-sol-imgs" onClick={() => setPhotoViewer(true)}>
                {imgs}
            </div>

            {photoViewer && (
                <PhotoViewer handleClose={() => setPhotoViewer(false)}>
                    {imgs}
                </PhotoViewer>
            )}
        </>
    )
}

export default ReshebaViewer
