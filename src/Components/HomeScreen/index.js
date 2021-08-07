import React, { useEffect, useState, useContext} from 'react';

import { onSnapshot } from "firebase/firestore";

import { database, timetableContext } from "../../Context";

import Day from "../TimeTable/Day";

import Notes from "./Notes"

import Now from "./Now"


export default function HomeScreen(props) {
    const timetable = useContext(timetableContext);

    let day_num = new Date().getDay();
    if (day_num == 0 || day_num == 6) day_num = 1;

    return (
        <>
        <Now/>
        <Notes/>
        { timetable && <Day day_num={day_num} day_data={timetable[2][day_num]}/> }
        </>
    )
}