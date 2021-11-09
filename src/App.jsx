import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import { ConfigContext, TimeTableContext, manifestContext, MarksContext } from "./Context"
import useSubjectsManifest from "./Hooks/useSubjectsManifest"
import useFirestoreListener from "./Hooks/useFirestoreListener"


import AdaptivePanel from "./Components/AdaptivePanel"
import Settings from "./Activities/Settings"
import Notebooks from "./Activities/Notebooks"

import Navigation from "./Activities/Navigation"

import HomeScreen from "./Activities/HomeScreen"
import Week from "./Activities/TimeTable/Week"
import Search from "./Activities/Search"
import Marks from "./Activities/Marks"


import "./style.scss"



const App = ({ config }) => {
    const [activeTab, setActiveTab] = useState(1)
    const [statusBar, setStatusBar] = useState(false)


    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            try {
                navigator.serviceWorker.addEventListener('message', (e) => {
                    const type = e.data.type
                
                    if (type == "update-complete") {
                        //
                    }
                })
    
                navigator.serviceWorker.ready.then(registration => {
                    registration.active.postMessage({ type: "run-updater" })
                })
            } catch (e) {
                alert(e.message)
            }
        }


        

        
    }, [])

    const manifest = useSubjectsManifest()
    const timetable = useFirestoreListener(config.database.timetable)
    const marks = useFirestoreListener(config.database.marks)

    const [notebooksOpen, setNotebooksOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)

    return (
        <ConfigContext.Provider value={{...config, setStatusBar}}>

            <div id="hw-re-container"></div>
            <div id="modals-container"></div>

            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} statusBar={statusBar}/>
            
            <manifestContext.Provider value={manifest}>
                <TimeTableContext.Provider value={timetable}>
                    <MarksContext.Provider value={marks}>
                        <div className="tab" hidden={activeTab != 1}><HomeScreen setSettingsOpen={setSettingsOpen}/></div>
                        <div className="tab" hidden={activeTab != 4}><Marks/></div>
                        <div className="tab" hidden={activeTab != 5}><Week/></div>
                    </MarksContext.Provider>
                </TimeTableContext.Provider>
                <div className="tab" hidden={activeTab != 2}><Search setNotebooksOpen={setNotebooksOpen} setSettingsOpen={setSettingsOpen}/></div>
            </manifestContext.Provider>


            { notebooksOpen && 
                <AdaptivePanel handleClose={() => setNotebooksOpen(false)} direction="split">
                    <div className="scroll-content" style={{marginTop: 50}}>
                        <Notebooks/>
                    </div>
                </AdaptivePanel>
            }


            { settingsOpen && 
                <AdaptivePanel handleClose={() => setSettingsOpen(false)}>
                    <Settings/>
                </AdaptivePanel>
            }

        </ConfigContext.Provider>
    )
}



App.propTypes = {
    config: PropTypes.object.isRequired
}



export default App