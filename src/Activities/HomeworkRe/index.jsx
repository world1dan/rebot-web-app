import React, { useRef, useContext } from "react"
import PropTypes from "prop-types"

import { manifestContext } from "../../Context"

import AdaptivePanel from "../../Components/AdaptivePanel"
import Group from "./Group"

import "./style.scss"



const HomeworkRe = (props) => {
    const manifest = useContext(manifestContext)
    const scrollContainer = useRef(null)



    const groups = []

    for (let subjectNum in props.lessonsData) {

        const lesson = props.lessonsData[subjectNum]

        const subjectInfo = manifest[lesson.id]

        if (!subjectInfo.url) continue
    

        const toOpen = lesson.hw.replace(/ *\([^)]*\) */g, "").split(",").map((num) => {
            return parseInt(num.replace(/\D/g, ""))
        })


        groups.push(
            <Group key={lesson.id} subjectInfo={subjectInfo} toOpen={toOpen} hwRaw={lesson.hw}></Group>
        )
    }


    return (
        <AdaptivePanel handleClose={props.handleClose} direction="split" scrollContainer={scrollContainer}>
            <div className="scroll-content hw-re" ref={scrollContainer}>
                { groups }
            </div>
        </AdaptivePanel>
    )

}



HomeworkRe.propTypes = {
    handleClose: PropTypes.func.isRequired,
    lessonsData: PropTypes.array.isRequired
}

export default HomeworkRe