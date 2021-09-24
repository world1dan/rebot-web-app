import React, { useState } from 'react';

import { user } from '../../../Context';

import HomeworkRe from '../../HomeworkRe';
import SubjectRow from './SubjectRow';


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
    const [instant, setInstant] = useState(false);

    const group = user.group;
    const day_data = props.day_data;
    let rows = [];
    let subj;

    for (subj in day_data) {
        let lesson, path;

        if (day_data[subj].groups) {
            if (day_data[subj][group]) {
                lesson = day_data[subj][group];
                path = `${props.pathToDay}.${subj}.${group}`;
            } else break
        } else {
            lesson = day_data[subj];
            path = `${props.pathToDay}.${subj}`;
        }
        rows.push(<SubjectRow key={subj} path={path} lesson_data={lesson}/>);
    }

    function openInstant() {
        const toOpen = [];

        for (let subj in day_data) {

            if (day_data[subj].groups) {
                if (day_data[subj][group]) {
                    let lesson = day_data[subj][group];
                    lesson.hw && toOpen.push(lesson)
                }
            } else {
                day_data[subj].hw && toOpen.push(day_data[subj]);
            }
        }
        
        if (toOpen.length != 0) {
            setInstant(toOpen)
        } else {
            globalThis.UI.alert("Решебники не найдены");
        }
    }

    return ( 
        <div className="UIBlock day">


            { instant && <HomeworkRe lessonsData={instant} handleClose={() => setInstant(false)}/> }

            <h1>{ day_titles[props.day_num] + (props.afterTitle ? props.afterTitle : "")}</h1>
            
            <button className="table-btn share" onClick={openInstant}><i className="fas fa-book fa-lg"></i></button>
            <div className="content">
                { rows }
            </div>
        </div>
    )

}
