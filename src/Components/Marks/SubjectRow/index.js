import React, { useRef, useContext, memo } from 'react';
import { setDoc } from "firebase/firestore";

import { database, manifestContext } from '../../../Context';


export default memo(function SubjectRow(props) {
    const manifest = useContext(manifestContext);
    const marksInput = useRef(null);

    const marks = props.marks;

    const title = manifest ? manifest[props.subj_id].title :  <i className="fas fa-circle-notch fa-spin"></i>;

    const style = {
        backgroundColor: manifest ? manifest[props.subj_id].color : "var(--background3)"
    }

    let sum = 0;
    let length = 0;

    let average = null;

    if (marks) {
        const marks_list = marks.split(",");

        marks_list.map((mark) => {
            let int = parseInt(mark);
    
            if (!int) return;
    
            sum += int;
            length++;
        })
    
        average = sum / length;
    
        if (!isNaN(average)) {
            average = Number(average.toFixed(1));
        } else {
            average = null;
        }
    }

    function addMark() {
        const input = marksInput.current;
        input.focus();

        if (input.value.trim().slice(-1) != "," && input.value != "") {
            input.value += ", ";
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        marksInput.current.blur();

        setDoc(database.marks, {
            [props.subj_id]: marksInput.current.value
        }, { merge: true });
    }
    


    return (
        <div className="SubjectRow">
            <div className="subj" style={style}>{title}</div>
            <div className="homework fr">
                <form onSubmit={handleSubmit} style={{display: "inline-block"}}>
                    <input type="text" defaultValue={marks} ref={marksInput} onBlur={handleSubmit}/>
                </form>
            </div>
            { marks && average && <div className="tool">{average}</div> }
            <div className="tool" onClick={addMark}><i className="fas fa-plus"></i></div>
        </div>
    );
    
})

