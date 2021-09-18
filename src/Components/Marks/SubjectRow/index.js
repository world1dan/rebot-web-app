// TEST READY

import React, { useRef, useState, useEffect, memo } from 'react';
import { setDoc } from "firebase/firestore";
import { database } from '../../../Context';

import EditableField from '../../Elements/EditableField';


function SubjectRow(props) {
    const marksInput = useRef(null);

    const [marks, setMarks] = useState(props.marks);

    useEffect(() => {
        setMarks(props.marks);
    }, [props.marks]);

    const title = props.subject.title;
    const style = {
        backgroundColor: props.subject.color
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

    function saveMarks() {
        setDoc(database.marks, {
            [props.subject.id]: marks
        }, { merge: true });
    }

    function handleChange(value) {
        setMarks(value);
    }

    return (
        <div className="flexRow">
            <div className="rowBlock medium colored" style={style}>{title}</div>
            <div className="rowBlock mainField">
                <EditableField ref={marksInput} value={marks} onChange={handleChange} onSave={saveMarks}/>
            </div>
            { marks && average && <div className="rowBlock square">{average}</div> }
            <div className="rowBlock square" onClick={createPattern}><i className="fas fa-plus"></i></div>
        </div>
    );
}

export default memo(SubjectRow);