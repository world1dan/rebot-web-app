import React, { useState, useMemo, useEffect } from "react"
import PropTypes from "prop-types"

import getSolutionImgs from "./getSolutionImgs"

import "./style.scss"



const ReshebaViewer = ({ subjectInfo, startNum, onClose }) => {
    const [num, setNum] = useState(startNum)


    const imgs = useMemo(() => getSolutionImgs(subjectInfo, num), [subjectInfo, num]) 


    const openAlt = () => {
        const altUrl = subjectInfo.alt_url.replace("?", subjectInfo.section && subjectInfo.title == "Физика" ? num + 2 : num)

        window.open(altUrl, "_blank")
    }

    return (
        <>
            <div className="hwr-sol-tools">
                { subjectInfo.alt_url && <button className="alt-btn block" onClick={openAlt}>Решебник 2</button> }
                <div className="center-section block">
                    <button onClick={() => setNum(num - 1)}>
                        <i className="fas fa-chevron-left fa-lg"></i>
                    </button>

                    <button className="num">{ num }</button>

                    <button onClick={() => setNum(num + 1)}>
                        <i className="fas fa-chevron-right fa-lg"></i>
                    </button>
                </div>
                { onClose && <button className="block close-btn" onClick={onClose}><i className="fas fa-times fa-lg"></i></button> }
            </div>
            <div className="hwr-sol-imgs">
                { imgs }
            </div>
        </>
    )
}



ReshebaViewer.propTypes = {
    subjectInfo: PropTypes.object.isRequired,
    startNum: PropTypes.number.isRequired,
    onClose: PropTypes.func
}


export default ReshebaViewer
