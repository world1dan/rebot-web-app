import React, { memo } from 'react';

import { database } from "../../Context";
import useFirestoreListener from '../../Hooks/useFirestoreListener';
import Day from "../TimeTable/Day";
import Header from "./Header";
import Now from "./Now";
import Notes from "./Notes";


import "./style.scss"

export default memo(function HomeScreen(props) {
    const timetable = useFirestoreListener(database.timetable);

    let afterTitle = null;
    
    const date = new Date();
    
    let day_num = date.getDay();

    if (date.getHours() > 15) {
        afterTitle = " (завтра)";
        day_num = day_num + 1;
    }

    if (day_num == 0 || day_num == 6) day_num = 1;


    return (
        <>
        { timetable && <Header setSettingsOpen={props.setSettingsOpen}/> }
        { timetable && (day_num != 0 || day_num != 6) && <Now day_data={timetable[2][day_num]} pathToDay={"2." + day_num}/> }
        <div id="homescreen-layout">
            <div className="side-left">
                <Notes/>
            </div>
            <div className="side-right">
                { timetable && <Day day_num={day_num} 
                                    pathToDay={"2." + day_num} 
                                    day_data={timetable[2][day_num]}
                                    afterTitle={afterTitle}/> }
            </div>
        </div>
        </>
    )
})