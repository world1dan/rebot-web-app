import React, { useEffect, useState } from 'react';

import SubjectRow from "../../TimeTable/Day/SubjectRow";
import { user } from '../../../Context';

import "./style.scss";


const ringsTimetable = [
    ["8.00", "8.45"],
    ["8.55", "9.40"],
    ["9.55", "10.40"],
    ["10.55", "11.40"],
    ["11.55", "12.40"],
    ["12.50", "13.35"],
    ["13.55", "14.40"],
];


function convertTime(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}




function getCurrent() {
    let num = null, info = null;
    

    ringsTimetable.forEach((range, index) => {

        const start = range[0].split(".");
        const end = range[1].split(".");

        const lessonStart = new Date();
        lessonStart.setHours(start[0], start[1], 0);

        const lessonEnd = new Date();
        lessonEnd.setHours(end[0], end[1], 0);

        const now = new Date();

        if (lessonStart <= now && now <= lessonEnd) {
            num = index + 1;
            info = "До конца осталось: " + convertTime(lessonEnd-now);

        } else if (lessonStart >= now && !num) {
            num = index + 1;
            info = "До начала осталось: " + convertTime(lessonStart-now);
        }
    });

    return [num, info]
}




export default function Now({ day_data, pathToDay }) {
    const group = user.group;
    const [lesson, setLesson] = useState(null);
    const [infoTitle, setInfoTitle] = useState("");


    function updateLesson() {
        const [num, info] = getCurrent();
        if (num) {
            if (num != lesson && info != infoTitle) {
                setLesson(num);
                setInfoTitle(info);
            }
        } else {
            setLesson(null);
            setInfoTitle("");
        }
    }


    useEffect(() => {
        updateLesson();
        setInterval(updateLesson, 1000)
    }, []);

    let lesson_data, path;


    if (lesson && day_data[lesson]) {
        if (day_data[lesson].groups) {
            if (day_data[lesson][group]) {
                lesson_data = day_data[lesson][group];
                path = `${pathToDay}.${lesson}.${group}`;
            } else {
                return null
            }
        } else {
            lesson_data = day_data[lesson];
            path = `${pathToDay}.${lesson}`;
        }

        return (
            lesson && 
            <div className="UIBlock Now">
                <SubjectRow lesson_data={lesson_data} path={path}/>
                <div className="info"> { infoTitle }</div>
            </div>
        )
    } else {
        return null;
    }


    
}