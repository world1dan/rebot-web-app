// TEST READY

import React, { useRef, useState, useEffect, memo } from 'react';
import { setDoc } from "firebase/firestore";
import AutosizeInput from 'react-input-autosize';
import { database } from '../../../Context';


function SubjectRow(props) {
    const marksInput = useRef(null);

    const [marks, setMarks] = useState(props.marks);

    useEffect(() => {
        setMarks(props.marks)
    }, [props.marks])

    const title = props.subject.title;
    const style = {
        backgroundColor: props.subject.color
    };

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
    
        if (!isNaN(average) && average <= 10) {
            average = Number(average.toFixed(1));
        } else {
            average = null;
        }
    }

    function createPattern() {
        marksInput.current.focus();

        if (marks.trim().slice(-1) != "," && marks != "") {
            setMarks(marks + ", ");
        }
    }

    function handleSubmit(event) {

        setDoc(database.marks, {
            [props.subject.id]: marks
        }, { merge: true });

        marksInput.current.blur();
        event.preventDefault();
    }

    return (
        <div className="SubjectRow">
            <div className="subj" style={style}>{title}</div>
            <div className="homework fr">
                <div className="scroll-wraper">
                    <AutosizeInput
                        type="text" 
                        inputMode="decimal" 
                        value={marks}
                        ref={marksInput} 
                        onChange={(e) => setMarks(e.target.value)} 
                        onBlur={handleSubmit}/>
                </div>
            </div>
            { marks && average && <div className="tool">{average}</div> }
            <div className="tool" onClick={createPattern}><i className="fas fa-plus"></i></div>
        </div>
    );
}

export default memo(SubjectRow);