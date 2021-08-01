import React, { useEffect, useState } from 'react';

import { onSnapshot } from "firebase/firestore";

import Day from "../TimeTable/Day";
import Notes from "./Notes"


export default function HomeScreen(props) {
    const [timetable, setTimetable] = useState(false);

    useEffect(() => {
        onSnapshot(props.timetableRef, (doc) => {
            setTimetable(doc.data());
        })
    }, [props.timetableRef]);

    let day_num = new Date().getDay();
    if (day_num == 0 || day_num == 6) day_num = 1;

    return (
        <>
        <Notes/>
        { timetable && <Day day_num={day_num} day_data={timetable[day_num]} manifest={props.manifest}/> }
        </>
    )
}