import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { getValue, fetchAndActivate } from "firebase/remote-config";

import { remoteConfig } from './Context';

import Main from './Main';

import UI from './Classes/UI';
import SideView from './Components/Elements/SideView';
import ReBotManager from './Classes/Rebot'
import LockScreen from './Classes/LockScreen';
import InstantView from './Classes/InstantView';
import Settings from './Components/Settings';
import Notebooks from './Components/Notebooks';

import './style.scss';


function App() {
    const [manifest, setManifest] = useState(null);

    const [notebooksOpen, setNotebooksOpen] = useState(false);

    const main = useRef(null);
    const settings = useRef(null);


    useEffect(() => {
        if (manifest) {
            globalThis.InstantView = new InstantView(manifest);
            globalThis.ReBot = new ReBotManager(manifest);
        }
    }, [manifest]);


    useEffect(() => {

        if (navigator.onLine) {
            try {
                fetchAndActivate(remoteConfig).then(() => {
                    const manifestJSON = getValue(remoteConfig, "subjectsManifest").asString();
                    const manifestObj = JSON.parse(manifestJSON);
                    
                    localStorage.setItem("cachedManifest", manifestJSON);
                    setManifest(manifestObj);
                });
            } catch {
                const manifestJSON = localStorage.cachedManifest;
                const manifestObj = JSON.parse(manifestJSON);
                setManifest(manifestObj);
            }

        } else {
            const manifestJSON = localStorage.cachedManifest;
            const manifestObj = JSON.parse(manifestJSON);
            setManifest(manifestObj);
        }

    }, []);


    return (
        <>
        <div ref={main} className="main">
            <Main
                id="notebooks"
                manifest={manifest} 
                setSettingsOpen={(state) => settings.current.setSettingsOpen(state)}
                setNotebooksOpen={setNotebooksOpen}/>
        </div>

        <SideView
            id="notebooks"
            open={notebooksOpen}
            title="Тетради"
            onClose={() => setNotebooksOpen(false)}
            backgroundRef={main}
            side="right">

            <Notebooks/>
        </SideView>

        <Settings ref={settings} backgroundRef={main}/>
    </>
    );
}





ReactDOM.render(<App/>, document.getElementById('root'));

try {
    navigator.serviceWorker.register('/sw.js')
}
catch {
    console.log("cant register sw")
}

const isSafari = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
globalThis.ios = isSafari;

globalThis.UI = UI;
globalThis.Security = LockScreen;


setTimeout(() => {
    const loading = document.querySelector(".loading");

    loading.classList.add("unactive");

    loading.addEventListener("transitionend", () => {
        loading.remove();
    });

}, isSafari ? 200 : 100);






if (isSafari) {
document.addEventListener("touchstart", startTouch, {passive: false});
document.addEventListener("touchmove", moveTouch, {passive: false});



var initialY = null;
 
function startTouch(e) {
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {

  if (initialY === null) {
    return;
  }
 
  var currentY = e.touches[0].clientY;
 
  var diffY = initialY - currentY;
  
    if (diffY > 0) {
        const root = document.getElementById("root");

        if (root.scrollHeight - root.scrollTop == root.clientHeight) {
            e.preventDefault()
        }
    } else {
        if (document.getElementById("root").scrollTop == 0) {
            e.preventDefault()
        }
    }

  initialY = null;
};

}