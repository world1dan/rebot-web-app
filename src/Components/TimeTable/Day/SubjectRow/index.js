import React, { useEffect, useRef, useState, memo } from 'react';

import './style.scss';

import { updateDoc } from "firebase/firestore";


function SubjectRow(props) {
    const hwInput = useRef(null);

    useEffect(() => {
        hwInput.current.value = props.lesson_data.hw;
    }, [props.lesson_data.hw])

    const title = props.manifest[props.lesson_data.id].title;

    const style = {
        backgroundColor: props.manifest[props.lesson_data.id].color
    }

    function handleSubmit(event) {
        event.preventDefault();

        hwInput.current.blur();

        updateDoc(props.timetableRef, {
            [props.path + ".hw"]: hwInput.current.value
        });
    }  

    return (
        <div className="SubjectRow">
            <div className="subj" style={style}>{title}</div>
            <div className="homework fr">
                <form onSubmit={handleSubmit} style={{display: "inline-block"}}>
                    <input type="number"    ref={hwInput}/>
                </form>
            </div>
            <div className="tool stealth"><i className="fas fa-book"></i></div>
        </div>
    );
    
}

export default memo(SubjectRow);
