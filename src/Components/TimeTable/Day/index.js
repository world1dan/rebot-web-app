import React, { useContext } from 'react';

import { settingsContext } from '../../../Context';

import SubjectRow from './SubjectRow';
import './style.scss';


const day_titles = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    7: "Воскресенье"
};



export default function Day(props) {

    const settings = useContext(settingsContext);

    const day_data = props.day_data;
    let rows = [];
    let subj;

    for (subj in day_data) {
        let lesson, path;

        if (day_data[subj].groups) {
            lesson = day_data[subj][settings.group];
            path = `${props.pathToDay}.${subj}.${settings.group}`;
        } else {
            lesson = day_data[subj];
            path = `${props.pathToDay}.${subj}`;
        }
        rows.push(<SubjectRow key={subj} path={path} lesson_data={lesson}/>);
    }

    function openInstant() {
        const toOpen = [];

        for (let subj in day_data) {
            day_data[subj].hw && toOpen.push(day_data[subj])
        }

        toOpen && window.InstantView.open(toOpen);
    }
    return ( 
        <div className="UIBlock day">
            <h1>{ day_titles[props.day_num] }</h1>
            { !settings.stealth && <button className="table-btn open-all stealth" onClick={openInstant}><i className="fas fa-book fa-lg"></i></button> }
            <button className="table-btn share"><i className="fas fa-share fa-lg"></i></button>
            <div className="content">
                { rows }
            </div>
        </div>
    )

}
