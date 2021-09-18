import React, { memo } from 'react';

import { database } from "../../Context";
import useFirestoreListener from '../../Hooks/useFirestoreListener';
import Day from "../TimeTable/Day";

import Notes from "./Notes"
//{ false && <Now day_num={day_num} pathToDay={"2." + day_num} day_data={timetable[2][day_num]}/> }
//import Now from "./Now"

import "./style.scss"

export default memo(function HomeScreen() {
    const timetable = useFirestoreListener(database.timetable);

    let day_num = new Date().getDay();
    if (day_num == 0 || day_num == 6) day_num = 1;
    
    return (
        <div id="homescreen-layout">
            <div className="side-left">
                <Notes/>
            </div>
            <div className="side-right">
                { timetable && <Day day_num={day_num} pathToDay={"2." + day_num} day_data={timetable[2][day_num]}/> }
            </div>
        </div>
    )
})