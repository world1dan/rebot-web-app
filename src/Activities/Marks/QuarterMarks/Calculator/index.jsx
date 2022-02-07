import { useRef, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import useStayScrolled from 'react-stay-scrolled'
import { AnimatePresence } from 'framer-motion'

import MarksInput from '../../MarksKeyboard/MarksInput'
import Mark from '../../Mark'
import Average from './Average'

import './style.scss'

const Calculator = ({ initialMarks }) => {
    const addedMarksContainerRef = useRef(null)
    const { stayScrolled } = useStayScrolled(addedMarksContainerRef)

    const [addedMarks, setAddedMarks] = useState([])

    useLayoutEffect(() => {
        stayScrolled()
    }, [addedMarks.length])

    const removeMark = (mark) => {
        setAddedMarks((prew) => {
            const updated = prew.filter((m) => {
                return m.time !== mark.time
            })

            return updated
        })
    }

    const removeLast = () => {
        setAddedMarks((prew) => {
            return prew.slice(0, -1)
        })
    }

    const handleMarkInput = (mark) => {
        setAddedMarks((prew) => [
            ...prew,
            {
                mark: parseInt(mark),
                time: Date.now(),
            },
        ])
    }

    let sum = 0

    const marksComponents = initialMarks.map((mark) => {
        sum += mark.mark

        return <Mark mark={mark} key={mark.time} unclickable />
    })

    const addedMarksComponents = addedMarks.map((mark) => {
        sum += mark.mark

        return (
            <Mark
                mark={mark}
                key={mark.time}
                customClickHandler={() => removeMark(mark)}
                animate
            />
        )
    })

    let average = sum / (initialMarks.length + addedMarks.length)

    if (!isNaN(average) && average <= 10) {
        average = Number(average.toFixed(2))
    } else {
        average = null
    }

    return (
        <div className="MarksCalculator">
            <Average averageMark={average} />
            <div className="marks-display">
                <div className="info">Оценки, которые уже есть</div>

                <div className="marks-container">{marksComponents}</div>

                <div className="info">Добавленные оценки</div>

                <div className="marks-container" ref={addedMarksContainerRef}>
                    <AnimatePresence>{addedMarksComponents}</AnimatePresence>
                </div>
            </div>
            <div className="marks-input-wrapper">
                <MarksInput
                    handleMarkInput={handleMarkInput}
                    onRemove={removeLast}
                />
            </div>
        </div>
    )
}

Calculator.propTypes = {
    initialMarks: PropTypes.array.isRequired,
}

export default Calculator
