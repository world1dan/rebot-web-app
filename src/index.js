import React, { useState, useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

import HomeScreen from './Components/HomeScreen';
import Week from './Components/TimeTable/Week';

import Marks from './Components/Marks';

import SettingsManager from './Components/Settings';
import ReBotManager from './Classes/Rebot';

import UI from './Classes/UI';
import LockScreen from './Classes/LockScreen';
import InstantView from './Classes/InstantView';

window.UI = UI;
window.Security = LockScreen;

import { database, manifestContext } from './Context';

import './style.scss';



function App() {
    const [manifest, setManifest] = useState(null);

    useEffect(() => {
        if (manifest) {
            window.ReBot = new ReBotManager(manifest);
            window.InstantView = new InstantView(manifest);
        }
    }, [manifest]);
    
    useEffect(() => {

        const fetchData = async(cachedManifest) => {
            const response = await fetch("static/subjects.json");
            const data = await response.json();

            if (cachedManifest) {
                if (cachedManifest.version < data.version) {
                    localStorage.setItem("manifest", JSON.stringify(data));
                    setManifest(data.manifest);
                    console.log("Manifest was updated");
                }
            } else {
                setManifest(data.manifest);
                localStorage.setItem("manifest", JSON.stringify(data));
            }
        }

        const oldManifestStr = localStorage.manifest;

        if (oldManifestStr) {
            const cachedManifest = JSON.parse(oldManifestStr);
            setManifest(cachedManifest.manifest);
            fetchData(cachedManifest);
        } else {
            fetchData();
        }


    }, []);

    let components;


    components =
        <manifestContext.Provider value={manifest}>
        { [createPortal(
                <Week/>,
            document.getElementById('week')
        ),
        createPortal(
                <Marks/>,
            document.getElementById('marks')
        ) ]
        }
        </manifestContext.Provider>

    return components
}


// const homescreen = <HomeScreen manifest={manifest} timetableRef={doc(firestore, "weeks", "1")}/>



ReactDOM.render(<App/>, document.getElementById('root'));






globalThis.Settings = new SettingsManager(database.settings);