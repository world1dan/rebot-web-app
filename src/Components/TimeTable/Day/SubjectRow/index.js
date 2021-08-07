import React, { useEffect, useRef, useContext, memo } from 'react';

import './style.scss';
import { manifestContext, database } from "../../../../Context";

import { updateDoc } from "firebase/firestore";


function SubjectRow(props) {
    const manifest = useContext(manifestContext);
    const hwInput = useRef(null);

    
    useEffect(() => {
        hwInput.current.value = props.lesson_data.hw;
    }, [props.lesson_data.hw])

    const title = manifest ? manifest[props.lesson_data.id].title :  <i className="fas fa-circle-notch fa-spin"></i>;

    const style = {
        backgroundColor: manifest ? manifest[props.lesson_data.id].color : "var(--background3)"
    }
    
  
    


    function handleSubmit(event) {
        event.preventDefault();

        hwInput.current.blur();

        updateDoc(database.timetable, {
            [props.path + ".hw"]: hwInput.current.value
        });
    }  

    function openInstant() {

        const toOpen = [{
            id: props.lesson_data.id,
            hw: props.lesson_data.hw
        }]

        window.InstantView.open(toOpen);
    }

    return (
        <div className="SubjectRow">
            <div className="subj" style={style}>{title}</div>
            <div className="homework fr">
                <form onSubmit={handleSubmit} style={{display: "inline-block"}}>
                    <input type="text" ref={hwInput}/>
                </form>
            </div>
            <div className="tool stealth" onClick={openInstant}><i className="fas fa-book"></i></div>
        </div>
    );
    
}

export default memo(SubjectRow);
