import React, { useRef, useContext, useEffect } from "react";
import ReactDOM from "react-dom"
import PropTypes from 'prop-types';
import AdaptivePanel from "../AdaptivePanel";
import Group from "./Group";
import "./style.scss"
import { manifestContext } from "../../Context";

import DisableEdgeScroll from "../../DisableEdgeScroll";


const HomeworkRe = (props) => {
    const manifest = useContext(manifestContext);
    const scrollContainer = useRef(null);

    useEffect(() => {
        DisableEdgeScroll(scrollContainer.current);
    }, []);

    const groups = [];

    for (let subjectNum in props.lessonsData) {

        const lesson = props.lessonsData[subjectNum];

        const subjectInfo = manifest[lesson.id];

        if (!subjectInfo.url) continue;
        
        const homework = lesson.hw;

        const toOpen = homework.replace(/ *\([^)]*\) */g, "").split(",").map((num) => {
            num = num.replace(/\D/g, "");
            return parseInt(num)
        });

        groups.push(
            <Group key={lesson.id} subjectInfo={subjectInfo} toOpen={toOpen} hwRaw={lesson.hw}></Group>
        )
    }


    return (
        ReactDOM.createPortal(
            <AdaptivePanel handleClose={props.handleClose} direction="split">
                <div className="scroll-content hw-re" ref={scrollContainer}>
                    { groups }
                </div>
            </AdaptivePanel>,

            document.getElementById("hw-re-container")
        )

    )

}

HomeworkRe.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default HomeworkRe;