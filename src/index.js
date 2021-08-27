import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { setDoc, onSnapshot } from "firebase/firestore";
import { getValue, fetchAndActivate } from "firebase/remote-config";

import { CSSTransition } from 'react-transition-group';

import { database, remoteConfig, settingsContext } from './Context';

import Main from './Main';

import UI from './Classes/UI';
import SideView from './Components/Elements/SideView';
import ReBotManager from './Classes/Rebot'
import LockScreen from './Classes/LockScreen';
import InstantView from './Classes/InstantView';
import Settings from './Components/Settings';


import './style.scss';




function App() {
    const [manifest, setManifest] = useState(null);

    const [timetable, setTimetable] = useState(null);
    const [settings, setSettings] = useState(null);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [notebooksOpen, setNotebooksOpen] = useState(false);

    const main = useRef(null);


    useEffect(() => {
        if (manifest) {
            window.InstantView = new InstantView(manifest);
        }
    }, [manifest]);

    useEffect(() => {
        if (settings && manifest && !settings.stealth) {
            window.ReBot = new ReBotManager(manifest);
        }
    }, [manifest, settings]);

    useEffect(() => {
        
        onSnapshot(database.timetable, (doc) => setTimetable(doc.data()))

        onSnapshot(database.settings, (doc) => {
            const settingsData = doc.data();
    
            const root = document.documentElement;

            if (doc.metadata.hasPendingWrites || !localStorage.theme) {
                root.setAttribute("theme", settingsData.theme);
                localStorage.setItem("theme", settingsData.theme);
            } 

            localStorage.setItem("stealth", settingsData.stealth);

            if (!settingsData.inversion) {
                root.style.setProperty('--inv', 0);
            } else {
                root.style.removeProperty('--inv');
            }
            
            setSettings(settingsData);
        });

        if (navigator.onLine) {
            fetchAndActivate(remoteConfig).then(() => {
                const manifestJSON = getValue(remoteConfig, "subjectsManifest").asString();
                const manifestObj = JSON.parse(manifestJSON);
                
                localStorage.setItem("cachedManifest", manifestJSON);
                setManifest(manifestObj);
            });
        } else {
            const manifestJSON = localStorage.cachedManifest;
            const manifestObj = JSON.parse(manifestJSON);
            setManifest(manifestObj);
        }


    }, []);



    function changeSetting(key, value) {
        settings[key] = value;
        setDoc(database.settings, settings, { merge: true });
    }


    return (
        <settingsContext.Provider value={settings}>

            <div ref={main} className="main">
                { settings && 
                    <Main
                        id="notebooks"
                        settings={settings} 
                        timetable={timetable} 
                        manifest={manifest} 
                        setSettingsOpen={setSettingsOpen}
                        setNotebooksOpen={setNotebooksOpen}/> }
            </div>
            


            <SideView
                id="settings"
                open={settingsOpen}
                title="Настройки"
                onClose={() => setSettingsOpen(false)}
                backgroundRef={main}
                side="right">

                <Settings changeSetting={changeSetting} setSettingsOpen={setSettingsOpen}/>
            </SideView>

        </settingsContext.Provider>
    )
}





ReactDOM.render(<App/>, document.getElementById('root'));



window.ios = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

/*
navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('ServiceWorker registration successful');
}, (e) => {
    console.log('ServiceWorker registration failed: ', e);
});
*/

window.UI = UI;
window.Security = LockScreen;

setTimeout(() => {
    const loading = document.querySelector(".loading");

    loading.classList.add("unactive");

    loading.addEventListener("transitionend", () => {
        loading.remove();
    });

}, window.ios ? 180 : 100)
