import React, { useState, useEffect, useRef } from 'react';

import { register } from 'register-service-worker';

import useRemoteConfig from './Hooks/useRemoteConfig';


import Tabs from './Tabs';

import ReBotManager from './Classes/Rebot'
import Settings from './Components/Settings';
import Notebooks from './Components/Notebooks';
import UpdateModal from "./Components/modals/UpdateModal";

import AdaptivePanel from "./Components/AdaptivePanel"

import './style.scss';





export default function App() {
    

    const manifest = useRemoteConfig("subjectsManifest", (a) => {
        globalThis.ReBot = new ReBotManager(a);
    });

    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [notebooksOpen, setNotebooksOpen] = useState(false);

    const main = useRef(null);
    const settings = useRef(null);


    useEffect(() => {
        // eslint-disable-next-line no-undef
        register('./sw.js', {
            registrationOptions: { scope: './' },
            updated (registration) {
                registration.unregister();
                setUpdateModalOpen(true)
            }
        });
    }, []);

    return (
        <>
        <div ref={main} className="main">
            <Tabs
                manifest={manifest} 
                setSettingsOpen={(state) => settings.current.setSettingsOpen(state)}
                setNotebooksOpen={setNotebooksOpen}/>
        </div>
        
        { notebooksOpen && 
            <AdaptivePanel handleClose={() => setNotebooksOpen(false)} direction="split">
                <div className="scroll-content" style={{marginTop: 60}}>
                    <Notebooks/>
                </div>
            </AdaptivePanel>
        }

        <Settings ref={settings} backgroundRef={main}/>

        <div id="hw-re-container"></div>

        { updateModalOpen && <UpdateModal onClose={() => setUpdateModalOpen(false)}/>}
        </>
    );
}
