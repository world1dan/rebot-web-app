import React, { memo, useRef } from 'react';

import './style.scss';

import { doc, updateDoc } from "firebase/firestore";

function arePropsEqual(prevProps, nextProps) {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

function SubjectRow(props) {
    const hwInput = useRef(null);

    const title = props.manifest[props.lesson_data.id].title;
    const hw = props.lesson_data.hw;

    const style = {
        backgroundColor: props.manifest[props.lesson_data.id].color
    }


    function handleSubmit(event) {
        event.preventDefault();

        hwInput.current.blur();

        updateDoc(doc(window.firestore, "weeks", "1"), {
            [props.path + ".hw"]: hwInput.current.value
        });
    }


    return (
        <div className="SubjectRow">
            <div className="subj" style={style}>{title}</div>
            <div className="homework fr">
                <form onSubmit={handleSubmit} style={{display: "inline-block"}}>
                    <input type="number" defaultValue={hw} ref={hwInput}/>
                </form>
            </div>
            <div className="tool stealth"><i className="fas fa-book"></i></div>
        </div>
    );
    
}

export default memo(SubjectRow, arePropsEqual);
