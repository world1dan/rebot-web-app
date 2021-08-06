import React from 'react';

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
    const day_data = props.day_data;
    let rows = [];
    let subj;

    for (subj in props.day_data) {
        rows.push(<SubjectRow key={subj} path={props.pathToDay + "." + subj} lesson_data={day_data[subj]}/>);
    }

    function openInstant() {
        const toOpen = [];

        for (let subj in day_data) {
            day_data[subj].hw && toOpen.push(day_data[subj])
        }

        toOpen && window.InstantView.open(toOpen);
    }
    return ( 
        <div className="UIBlock">
            <h1>{ day_titles[props.day_num] }</h1>
            <button className="table-btn open-all stealth" onClick={openInstant}><i className="fas fa-book fa-lg"></i></button>
            <button className="table-btn share"><i className="fas fa-share fa-lg"></i></button>
            <div className="content">
                { rows }
            </div>
        </div>
    )

}
