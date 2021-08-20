import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { setDoc, onSnapshot } from "firebase/firestore";
import { getValue, fetchAndActivate } from "firebase/remote-config";

import { CSSTransition } from 'react-transition-group';
import { disablePageScroll, allowTouchMove } from 'scroll-lock';

import { database, remoteConfig, manifestContext, timetableContext, settingsContext } from './Context';

import HomeScreen from './Components/HomeScreen';
import Week from './Components/TimeTable/Week';
import Resheba from './Components/Resheba';
import Marks from './Components/Marks';

import UI from './Classes/UI';

import LockScreen from './Classes/LockScreen';
import InstantView from './Classes/InstantView';
import ReshebaManager from './Classes/Rebot';
import Settings from './Components/Settings';

import './style.scss';




function App() {
    const [manifest, setManifest] = useState(null);

    const [timetable, setTimetable] = useState(null);
    const [settings, setSettings] = useState({
        stealth: localStorage.stealth == "false" ? false : true
    });

    const [settingsOpen, setSettingsOpen] = useState(false);

    const main = useRef(null);

    const [activeTab, setActiveTab] = useState(2);


    function changeTab(tabId) {
        setActiveTab(3);
        const activeOld = document.querySelector(".app.active");
        const activeNew = document.querySelector(".app#" + tabId);

        if (activeOld) {
            if (activeOld.id == activeNew.id) return;
            activeOld.classList.remove("active");
        }

        activeNew.classList.add("active");

        const oldBtn = document.querySelector(".bottom-nav span.active"); 

        if (oldBtn) {
            oldBtn.classList.remove("active");
        }
    
        document.querySelector(".bottom-nav #" + tabId).classList.add("active");

        document.getElementById("root").scrollTop = 0;
    }


    useEffect(() => {
        if (manifest) {
            //window.ReBot = new ReshebaManager(manifest);
            window.InstantView = new InstantView(manifest);
        }
    }, [manifest]);


    useEffect(() => {

        onSnapshot(database.timetable, (doc) => setTimetable(doc.data()))

        onSnapshot(database.settings, (doc) => {
            const settingsData = doc.data();

            setSettings(settingsData);

            const root = document.documentElement;

            root.setAttribute("theme", settingsData.theme);
            localStorage.setItem("theme", settingsData.theme);
            localStorage.setItem("stealth", settingsData.stealth);

            if (settingsData.inversion) {
                root.style.setProperty('--inv', 0.87);
            } else {
                root.style.setProperty('--inv', 0);
            }

            if (settingsData.stealth && !document.querySelector(".app.active")) {
                changeTab("homescreen");
            }
        });

        fetchAndActivate(remoteConfig).then(() => {
            const manifestJSON = getValue(remoteConfig, "subjectsManifest").asString();
            const manifestObj = JSON.parse(manifestJSON);
            setManifest(manifestObj);
        })

    }, []);



    function changeSetting(key, value) {
        settings[key] = value;
        setDoc(database.settings, settings, { merge: true });
    }

    function windowOpened() {
        globalThis.blurListener = (e) => {
            e.stopPropagation();
            setSettingsOpen(false);
        }

        main.current.addEventListener("click", globalThis.blurListener, { once: true });
        main.current.classList.add("unfocused");
    }

    function windowClosed() {
        main.current.classList.remove("unfocused");
        main.current.removeEventListener("click", globalThis.blurListener);
    }


    return (
        <>
        <settingsContext.Provider value={settings}>
            <div ref={main} className="main">
                <div className="bottom-nav">
                    <div className="nav-content">
                        { !settings.stealth && <span id="rebot" onClick={() => changeTab("rebot")}><i className="fas fa-book"></i></span>}
                        <span id="homescreen" className="active" onClick={() => changeTab("homescreen")}><svg height="22" width="22" viewBox="0 0 512 512" fill="var(--text)"><path d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0"/></svg></span>
                        <span id="marks" onClick={() => changeTab("marks")}><svg width="34" height="34" viewBox="0 0 28 28" fill="var(--text)"><path d="M25.0039 9.51465L16.417 5.58594C15.4941 5.16406 14.7383 4.9707 14 4.98828C13.2617 4.9707 12.5059 5.16406 11.583 5.58594L2.99609 9.51465C2.38086 9.78711 2.06445 10.2969 2.06445 10.8154C2.06445 11.3428 2.38086 11.8438 2.99609 12.1162L6.39746 13.6543L12.1016 10.9912C12.0664 10.9297 12.0488 10.877 12.0488 10.8154C12.0488 10.1738 13.0244 9.7168 14.0264 9.7168C15.0371 9.7168 16.0039 10.1738 16.0039 10.8154C16.0039 11.4746 15.0371 11.9404 14.0264 11.9404C13.7188 11.9404 13.4023 11.8965 13.1211 11.8086L7.76855 14.3047L11.583 16.0537C12.5059 16.4756 13.2617 16.6602 14 16.6514C14.7383 16.6602 15.4941 16.4756 16.417 16.0537L25.0039 12.1162C25.6191 11.835 25.9355 11.3428 25.9355 10.8154C25.9355 10.2969 25.6191 9.78711 25.0039 9.51465ZM7.7334 15.7109V20.8525C9.2627 21.7666 11.4336 22.3203 14 22.3203C19.1592 22.3203 22.7012 20.0967 22.7012 17.3545V14.5859L16.9531 17.2227C15.8896 17.7061 14.9229 17.9521 14 17.9434C13.0859 17.9521 12.1104 17.7061 11.0469 17.2227L7.7334 15.7109ZM5.29883 14.5947V17.3545C5.29883 18.1191 5.70312 19.0244 6.43262 19.7979V15.1133L5.29883 14.5947ZM5.65918 22.9355V25.2119C5.65918 25.959 6.15137 26.4512 6.89844 26.4512H7.26758C8.01465 26.4512 8.49805 25.959 8.49805 25.2119V22.9355C8.49805 22.3555 8.20801 21.9336 7.7334 21.7666V20.8525C7.22363 20.5449 6.78418 20.1934 6.43262 19.7979V21.7666C5.95801 21.9248 5.65918 22.3555 5.65918 22.9355Z"/></svg></span>
                        <span id="week" onClick={() => changeTab("week")}><svg width="36" height="36" fill="var(--text)" viewBox="0 0 28 28"><path d="M7.94434 21.8809H20.0469C21.9541 21.8809 22.9473 20.8965 22.9473 19.0156V8.31934C22.9473 6.43848 21.9541 5.4541 20.0469 5.4541H7.94434C6.0459 5.4541 5.05273 6.42969 5.05273 8.31934V19.0156C5.05273 20.8965 6.0459 21.8809 7.94434 21.8809ZM7.93555 20.1318C7.20605 20.1318 6.80176 19.7539 6.80176 18.9805V10.8945C6.80176 10.1211 7.20605 9.74316 7.93555 9.74316H20.0557C20.7852 9.74316 21.1895 10.1211 21.1895 10.8945V18.9805C21.1895 19.7539 20.7852 20.1318 20.0557 20.1318H7.93555ZM12.3037 12.7754H12.8223C13.1387 12.7754 13.2441 12.6787 13.2441 12.3711V11.8525C13.2441 11.5361 13.1387 11.4395 12.8223 11.4395H12.3037C11.9873 11.4395 11.8818 11.5361 11.8818 11.8525V12.3711C11.8818 12.6787 11.9873 12.7754 12.3037 12.7754ZM15.1777 12.7754H15.6963C16.0039 12.7754 16.1094 12.6787 16.1094 12.3711V11.8525C16.1094 11.5361 16.0039 11.4395 15.6963 11.4395H15.1777C14.8613 11.4395 14.7559 11.5361 14.7559 11.8525V12.3711C14.7559 12.6787 14.8613 12.7754 15.1777 12.7754ZM18.043 12.7754H18.5615C18.8779 12.7754 18.9834 12.6787 18.9834 12.3711V11.8525C18.9834 11.5361 18.8779 11.4395 18.5615 11.4395H18.043C17.7354 11.4395 17.6299 11.5361 17.6299 11.8525V12.3711C17.6299 12.6787 17.7354 12.7754 18.043 12.7754ZM9.43848 15.6055H9.94824C10.2646 15.6055 10.3701 15.5088 10.3701 15.1924V14.6738C10.3701 14.3662 10.2646 14.2695 9.94824 14.2695H9.43848C9.12207 14.2695 9.0166 14.3662 9.0166 14.6738V15.1924C9.0166 15.5088 9.12207 15.6055 9.43848 15.6055ZM12.3037 15.6055H12.8223C13.1387 15.6055 13.2441 15.5088 13.2441 15.1924V14.6738C13.2441 14.3662 13.1387 14.2695 12.8223 14.2695H12.3037C11.9873 14.2695 11.8818 14.3662 11.8818 14.6738V15.1924C11.8818 15.5088 11.9873 15.6055 12.3037 15.6055ZM15.1777 15.6055H15.6963C16.0039 15.6055 16.1094 15.5088 16.1094 15.1924V14.6738C16.1094 14.3662 16.0039 14.2695 15.6963 14.2695H15.1777C14.8613 14.2695 14.7559 14.3662 14.7559 14.6738V15.1924C14.7559 15.5088 14.8613 15.6055 15.1777 15.6055ZM18.043 15.6055H18.5615C18.8779 15.6055 18.9834 15.5088 18.9834 15.1924V14.6738C18.9834 14.3662 18.8779 14.2695 18.5615 14.2695H18.043C17.7354 14.2695 17.6299 14.3662 17.6299 14.6738V15.1924C17.6299 15.5088 17.7354 15.6055 18.043 15.6055ZM9.43848 18.4268H9.94824C10.2646 18.4268 10.3701 18.3301 10.3701 18.0225V17.5039C10.3701 17.1875 10.2646 17.0908 9.94824 17.0908H9.43848C9.12207 17.0908 9.0166 17.1875 9.0166 17.5039V18.0225C9.0166 18.3301 9.12207 18.4268 9.43848 18.4268ZM12.3037 18.4268H12.8223C13.1387 18.4268 13.2441 18.3301 13.2441 18.0225V17.5039C13.2441 17.1875 13.1387 17.0908 12.8223 17.0908H12.3037C11.9873 17.0908 11.8818 17.1875 11.8818 17.5039V18.0225C11.8818 18.3301 11.9873 18.4268 12.3037 18.4268ZM15.1777 18.4268H15.6963C16.0039 18.4268 16.1094 18.3301 16.1094 18.0225V17.5039C16.1094 17.1875 16.0039 17.0908 15.6963 17.0908H15.1777C14.8613 17.0908 14.7559 17.1875 14.7559 17.5039V18.0225C14.7559 18.3301 14.8613 18.4268 15.1777 18.4268Z"/></svg></span>
                    </div>
                </div>

                <manifestContext.Provider value={manifest}>
                <timetableContext.Provider value={timetable}>
                    <div className="app center-auto active" id="homescreen"><HomeScreen/></div>
                    <div className="app center-auto" id="week"><Week setSettingsOpen={setSettingsOpen}/></div>
                    <div className="app center-auto mw700" id="marks"><Marks/></div>
                </timetableContext.Provider>
                </manifestContext.Provider>

                { !settings.stealth && <div className="app center mw600 stealth" id="rebot"><Resheba setSettingsOpen={setSettingsOpen}/></div> }
            </div>

            <CSSTransition 
                in={settingsOpen} 
                onEnter={windowOpened}
                onExit={windowClosed}
                timeout={600}
                classNames='windowReact' 
                unmountOnExit>

                <Settings changeSetting={changeSetting} setSettingsOpen={setSettingsOpen}/>
            </CSSTransition>
        </settingsContext.Provider>
        </>
    )
}





ReactDOM.render(<App/>, document.getElementById('root'));



window.ios = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

if (false) {
    const targetElement = document.getElementById('root');
    setTimeout(() => disablePageScroll(targetElement, { allowTouchMove: el => el.tagName === 'input' }), 1000);
}

/*
navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('ServiceWorker registration successful');
}, (e) => {
    console.log('ServiceWorker registration failed: ', e);
});
*/

window.UI = UI;
window.Security = LockScreen;


