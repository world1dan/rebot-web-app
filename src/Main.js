import React, { useEffect, useState } from 'react';

import Navigation from './Components/Elements/Navigation';

import { manifestContext, timetableContext } from './Context';
import HomeScreen from './Components/HomeScreen';
import Week from './Components/TimeTable/Week';
import Resheba from './Components/Resheba';
import Marks from './Components/Marks';



export default function Main(props) {
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        document.getElementById("root").scrollTop = 0;
    }, [activeTab]);

    return (
        <>
        <Navigation settings={props.settings} activeTab={activeTab} setActiveTab={setActiveTab}/>
        { !props.settings.stealth && <div id="rebot" className={"app center mw600 " + (activeTab == 2 ? "active" : "")}><Resheba setNotebooksOpen={props.setNotebooksOpen} setSettingsOpen={props.setSettingsOpen}/></div> }

        <manifestContext.Provider value={props.manifest}>

            { props.timetable && 
                <timetableContext.Provider value={props.timetable}>
                    <div className={"app center-auto " + (activeTab == 4 ? "active" : "")}><Week setSettingsOpen={props.setSettingsOpen}/></div>
                    <div className={"app center-auto " + (activeTab == 1 ? "active" : "")}><HomeScreen/></div>
                </timetableContext.Provider> 
            }

            <div className={"app center-auto mw700 " + (activeTab == 3 ? "active" : "")}><Marks/></div>
        </manifestContext.Provider>
        </>
    )
}