import React, { useEffect, useContext, useState, memo, useRef } from 'react';
import HomeworkRe from '../../../HomeworkRe';
import './style.scss';
import { manifestContext, database } from "../../../../Context";

import EditableField from '../../../Elements/EditableField';
import RowContextMenu from './RowContextMenu';

import { updateDoc } from "firebase/firestore";


function SubjectRow(props) {
    const manifest = useContext(manifestContext);
    const hwInput = useRef(null);
    const [homework, setHomework] = useState(props.lesson_data.hw);
    const [instant, setInstant] = useState(false);

    const hasResheba = manifest && manifest[props.lesson_data.id].url;

    useEffect(() => {
        setHomework(props.lesson_data.hw);
    }, [props.lesson_data.hw])


    const title = manifest ? manifest[props.lesson_data.id].title :  <i className="fas fa-circle-notch fa-spin"></i>;
    const style = {
        backgroundColor: manifest ? manifest[props.lesson_data.id].color : "var(--background3)"
    }
    


    function saveHomework () {
        if (homework != props.lesson_data.hw) {
            updateDoc(database.timetable, {
                [props.path + ".hw"]: homework
            });
        }
    }  

    function openInstant() {
        setInstant(true);
    }

    function copy() {
        navigator.clipboard.writeText(homework)
        .then(() => {
            window.UI.alert("Скопировано");
        })
    } 
    
    const classes = props.lesson_data.test ? "flexRow highlighted" : "flexRow"; 

    return (
        <>
        


        <div className={classes}>
            <div className="rowBlock medium colored" style={style}>{title}</div>
            <div className="rowBlock mainField">
                <EditableField ref={hwInput} value={homework} onChange={setHomework} onSave={saveHomework}/>
            </div>
            <div className="rowBlock square">
                <RowContextMenu
                    openInstant={openInstant}
                    copy={copy}
                    isResheba={hasResheba}
                    homework={homework}
                />

            { hasResheba && instant && <HomeworkRe lessonsData={[props.lesson_data]} handleClose={() => setInstant(false)}/> }

            </div>
        </div>
        </>
    );
    
}

export default memo(SubjectRow);
