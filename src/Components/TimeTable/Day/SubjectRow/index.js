import React, { useEffect, useContext, useState, memo, useRef } from 'react';

import './style.scss';
import { manifestContext, settingsContext, database } from "../../../../Context";

import EditableField from '../../../Elements/EditableField';
import Dropdown from '../../../Elements/Dropdown';

import { updateDoc } from "firebase/firestore";


function SubjectRow(props) {
    const manifest = useContext(manifestContext);
    const settings = useContext(settingsContext);
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
                <Dropdown>
                    { !settings.stealth && homework && 
                    <button className="withIcon" onClick={openInstant}>
                        <i className="fas fa-book"></i>
                        <span>Решебник</span>
                    </button>
                    }
                    <button className="withIcon" onClick={setTest}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="var(--text)"><path d="M7.04785 16.3613C7.04785 17.1611 7.59277 17.6885 8.42773 17.6885H13.1211V21.8545C13.1211 23.0762 13.7539 24.333 14 24.333C14.2373 24.333 14.8701 23.0762 14.8701 21.8545V17.6885H19.5723C20.4072 17.6885 20.9434 17.1611 20.9434 16.3613C20.9434 14.4629 19.4404 12.5205 16.9531 11.6064L16.6719 7.51074C17.9814 6.77246 19.0186 5.95508 19.4668 5.36621C19.7129 5.05859 19.8271 4.7334 19.8271 4.45215C19.8271 3.87207 19.3877 3.44141 18.7197 3.44141H9.27148C8.6123 3.44141 8.16406 3.87207 8.16406 4.45215C8.16406 4.7334 8.27832 5.05859 8.52441 5.36621C8.97266 5.95508 10.0098 6.77246 11.3193 7.51074L11.0381 11.6064C8.55078 12.5205 7.04785 14.4629 7.04785 16.3613Z"/></svg>
                        <span>{ props.lesson_data.test ? "Не контрольная" : "Контрольная" }</span>
                    </button>
                    <button className="withIcon" onClick={copy}>
                        <i className="fas fa-clone"></i>
                        <span>Скопировать</span>
                    </button>
                </Dropdown>
            </div>
        </div>
    );
    
}

export default memo(SubjectRow);
