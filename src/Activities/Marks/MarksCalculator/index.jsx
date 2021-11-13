import React, { useState } from "react"
import PropTypes from "prop-types"

import "./style.scss"
import MarksInput from "../MarksInput"
import Mark from "../SubjectMarks/Mark"
import VerticalLayout from "Components/Layouts/VerticalLayout"
import VScroll from "Components/VScroll"
const MarksCalculator = (props) => {

    const [addedMarks, setAddedMarks] = useState([])


    const [marks, setMarks] = useState(props.realMarks)
    


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
        setAddedMarks((prew) => [...prew, {
            mark: parseInt(mark),
            time: Date.now()
        }])
    }



    let sum = 0


    const marksComponents = marks.map((mark) => {
        sum += mark.mark

        return (
            <Mark mark={mark} key={mark.time} removeMark={removeMark}/>
        )
    })

    const addedMarksComponents = addedMarks.map((mark) => {
        sum += mark.mark

        return (
            <Mark mark={mark} key={mark.time} removeMark={removeMark}/>
        )
    })


    let average = sum / (marks.length + addedMarks.length)

    if (!isNaN(average) && average <= 10) {
        average = Number(average.toFixed(2))
    } else {
        average = null
    }






    return (
        <VScroll>
            <div className="MarksCalculator">
                <VerticalLayout>
                    <h1 className="average-mark">{ average }</h1>
                    <div className="marks-display">
                        <div className="info">Оценки, которые уже есть</div>

                        <div className="marks-container">
                            { marksComponents }
                        </div>

                        <div className="info">Добавленные оценки</div>

                        <div className="marks-container">
                            { addedMarksComponents }
                        </div>
                    </div>
                    <MarksInput handleMarkInput={handleMarkInput} onRemove={removeLast}/>
                </VerticalLayout>
            </div>
        </VScroll>
    )
}



MarksCalculator.propTypes = {
    marks: PropTypes.string.isRequired,
    subject: PropTypes.object.isRequired
}



export default MarksCalculator