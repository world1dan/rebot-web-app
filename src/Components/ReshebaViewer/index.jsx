import React, { useState, useMemo } from "react"
import PropTypes from "prop-types"

import getSolutionImgs from "./getSolutionImgs"

import "./style.css"



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
                <button className="alt block" onClick={openAlt}>Решебник 2</button>
                <div className="center-section">
                    <button className="block" onClick={() => setNum(num - 1)}><i className="fas fa-chevron-left fa-lg"></i></button>
                    <button className="num block">{ num }</button>
                    <button className="block" onClick={() => setNum(num + 1)}><i className="fas fa-chevron-right fa-lg"></i></button>
                    { onClose && <button className="block" onClick={onClose}><i className="fas fa-times fa-lg"></i></button> }
                </div>
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



