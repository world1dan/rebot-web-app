import React, { useEffect, useContext, useState, memo, useRef } from 'react';

import './style.scss';
import { manifestContext, database } from "../../../../Context";

import EditableField from '../../../Elements/EditableField';
import RowContextMenu from './RowContextMenu';

import { updateDoc } from "firebase/firestore";


function SubjectRow(props) {
    const manifest = useContext(manifestContext);
    const hwInput = useRef(null);
    const [homework, setHomework] = useState(props.lesson_data.hw);

    useEffect(() => {
        setHomework(props.lesson_data.hw);
    }, [props.lesson_data.hw])


    const title = manifest ? manifest[props.lesson_data.id].title :  <i className="fas fa-circle-notch fa-spin"></i>;
    const style = {
        backgroundColor: manifest ? manifest[props.lesson_data.id].color : "var(--background3)"
    }
    

    function saveHomework () {
        updateDoc(database.timetable, {
            [props.path + ".hw"]: homework
        });
    }  

    function setTest() {
        updateDoc(database.timetable, {
            [props.path + ".test"]: !props.lesson_data.test
        });
    }

    function openInstant() {

        const toOpen = [{
            id: props.lesson_data.id,
            hw: homework
        }]

        window.InstantView.open(toOpen);
    }

    function copy() {
        navigator.clipboard.writeText(homework)
        .then(() => {
            window.UI.alert("Скопировано");
        })
    } 
    
    const classes = props.lesson_data.test ? "flexRow highlighted" : "flexRow"; 

    return (
        <div className={classes}>
            <div className="rowBlock medium colored" style={style}>{title}</div>
            <div className="rowBlock mainField">
                <EditableField ref={hwInput} value={homework} onChange={setHomework} onSave={saveHomework}/>
            </div>
            <div className="rowBlock square">
                <RowContextMenu
                    openInstant={openInstant}
                    setTest={setTest}
                    copy={copy}
                    isResheba={manifest && manifest[props.lesson_data.id].url}
                    isTest={props.lesson_data.test}
                    homework={homework}
                />
            </div>
        </div>
    );
    
}

export default memo(SubjectRow);
