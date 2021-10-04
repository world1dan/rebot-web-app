import React, { useEffect, useState } from 'react';

import Navigation from './Components/Elements/Navigation';

import { manifestContext } from './Context';
import HomeScreen from './Components/HomeScreen';
import Week from './Components/TimeTable/Week';
import Resheba from './Components/Resheba';
import Marks from './Components/Marks';


export default function Main(props) {
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        document.getElementById("root").scrollTop = 0;
    }, [activeTab])

    return (
        <>
        <Navigation settings={props.settings} activeTab={activeTab} setActiveTab={setActiveTab}/>

        <div id="rebot" className="app center mw600" hidden={activeTab != 2}><Resheba setNotebooksOpen={props.setNotebooksOpen} setSettingsOpen={props.setSettingsOpen}/></div>

        <manifestContext.Provider value={props.manifest}>
            <div className="app center-auto" hidden={activeTab != 4}><Week/></div>
            <div className="app center-auto" hidden={activeTab != 1}><HomeScreen setSettingsOpen={props.setSettingsOpen}/></div>

            <div className="app center-auto mw700" hidden={activeTab != 3}><Marks/></div>
        </manifestContext.Provider>
        </>
    )
}
