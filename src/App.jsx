import React, { useState } from "react"
import PropTypes from "prop-types"

import { ConfigContext, TimeTableContext, manifestContext } from "./Context"
import useRemoteConfig from "./Hooks/useRemoteConfig"
import useFirestoreListener from "./Hooks/useFirestoreListener"


import AdaptivePanel from "./Components/AdaptivePanel"
import Settings from "./Activities/Settings"
import Notebooks from "./Activities/Notebooks"

import Navigation from "./Activities/Navigation"

import HomeScreen from "./Activities/HomeScreen"
import Week from "./Activities/TimeTable/Week"
import Search from "./Activities/Search"
import Marks from "./Activities/Marks"

import Messenger from "./Activities/Messenger"

import "./style.scss"



const App = ({ config }) => {
    const [activeTab, setActiveTab] = useState(1)

    const manifest = useRemoteConfig("subjectsManifest")
    const timetable = useFirestoreListener(config.database.timetable)

    const [notebooksOpen, setNotebooksOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)

    return (
        <ConfigContext.Provider value={config}>

            <div id="hw-re-container"></div>
            <div id="notifications-container"></div>

            <Navigation activeTab={activeTab} setActiveTab={setActiveTab}/>
            
            <manifestContext.Provider value={manifest}>
                <TimeTableContext.Provider value={timetable}>
                    <div className="tab" hidden={activeTab != 1}><HomeScreen setSettingsOpen={setSettingsOpen}/></div>
                    <div className="tab Messenger" hidden={activeTab != 3}><Messenger/></div>
                    <div className="tab" hidden={activeTab != 4}><Marks/></div>
                    <div className="tab" hidden={activeTab != 5}><Week/></div>
                    <div className="tab" hidden={activeTab != 2}><Search setNotebooksOpen={setNotebooksOpen} setSettingsOpen={setSettingsOpen}/></div>
                </TimeTableContext.Provider>
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