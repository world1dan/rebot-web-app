import React, { useState, useMemo } from "react";
import PropTypes from 'prop-types';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import getSolutionImgs from "./getSolutionImgs";

import "./style.css";

const ReshebaViewer = ({ subjectInfo, startNum }) => {

    const [num, setNum] = useState(startNum);
    const [zoom, setZoom] = useState(false);

    const imgs = useMemo(() => getSolutionImgs(subjectInfo, num), [subjectInfo, num]); 


    const openAlt = () => {
        const altUrl = subjectInfo.alt_url.replace("?", subjectInfo.section && subjectInfo.title == "Физика" ? num + 2 : num);

        window.open(altUrl, "_blank");
    }

    const toggleZoom = () => {
        setZoom(!zoom)
    }


    return (
        <>
        <div className="hwr-sol-tools">
            <button className="alt block" onClick={openAlt}>Решебник 2</button>
            <div className="center-section">
                <button className="block" onClick={() => setNum(num - 1)}><i className="fas fa-chevron-left fa-lg"></i></button>
                <button className="num block">{ num }</button>
                <button className="block" onClick={() => setNum(num + 1)}><i className="fas fa-chevron-right fa-lg"></i></button>
                <button className="block" onClick={toggleZoom}><i className="fas fa-search-plus fa-lg"></i></button>
            </div>
        </div>
        { zoom ? 
            <TransformWrapper>
            <TransformComponent>
                <div className="hwr-sol-imgs">
                    { imgs }
                </div>
            </TransformComponent>
            </TransformWrapper>
            : <div className="hwr-sol-imgs">
                { imgs }
            </div>
        }
        </>
    )

}

ReshebaViewer.propTypes = {
    subjectInfo: PropTypes.object.isRequired,
    startNum: PropTypes.number.isRequired
}


export default ReshebaViewer;



