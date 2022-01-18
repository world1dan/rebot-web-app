//import { hot } from 'react-hot-loader/root';
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import {
    ConfigContext,
    TimeTableContext,
    manifestContext,
    MarksContext
} from './Context'

import useSubjectsManifest from './Hooks/useSubjectsManifest'
import useFirestoreListener from './Hooks/useFirestoreListener'
import analyticsEvent from 'Utils/analyticsEvent'

import TabBar from './Components/TabBar'
import HomeScreen from './Activities/HomeScreen'
import Week from './Activities/TimeTable/Week'
import Search from './Activities/Search'
import Marks from './Activities/Marks'

import './style.scss'



const App = ({ config }) => {
    const timetable = useFirestoreListener(config.database.timetable)
    const marks = useFirestoreListener(config.database.marks)

    const manifest = useSubjectsManifest()

    const [activeTab, setActiveTab] = useState(1)
    const [statusBar, setStatusBar] = useState(false)


    useEffect(() => {
        
        if (process.env.NODE_ENV === 'production') {
            try {
                navigator.serviceWorker.addEventListener('message', (e) => {
                    const type = e.data.type

                    if (type == 'update-complete') {
                        analyticsEvent({
                            type: 'app-update-complete',
                            user: config.user.first_name ?? config.user.id
                        })
                    }
                })

                navigator.serviceWorker.ready.then((registration) => {
                    registration.active.postMessage({ type: 'run-updater' })
                })
            } catch (e) {
                alert(e.message)
            }
        }

        const onOpen = () => {
            analyticsEvent({
                type: 'app-openned',
                username: config.user.first_name ?? null,
                UUID: config.user.id
            })
        }

        onOpen()

        window.addEventListener('error', (e) => {
            analyticsEvent({
                type: 'app-error',
                error: e.message,
                username: config.user.first_name ?? null,
                UUID: config.user.id
            })
        })
    }, [])



    const configContextValue = useMemo(() => {
        return {
            ...config,
            setStatusBar
        }
    }, [config])

    if (!manifest) return null
    
    return (
        <ConfigContext.Provider value={configContextValue}>
            <div id="modals-container"></div>

            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                statusBar={statusBar}
            />

            <manifestContext.Provider value={manifest}>
                <MarksContext.Provider value={marks}>
                    <TimeTableContext.Provider value={timetable}>
                        <div className="tab" hidden={activeTab != 1}>
                            <HomeScreen/>
                        </div>
                        { activeTab == 5 && (
                            <div className="tab">
                                <Week />
                            </div>
                        )}
                    </TimeTableContext.Provider>

                    { activeTab == 3 && (
                        <div className="tab">
                            <Marks />
                        </div> 
                    )}
                </MarksContext.Provider>
                <div className="tab" hidden={activeTab != 2}>
                    <Search/>
                </div>
            </manifestContext.Provider>
        </ConfigContext.Provider>
    )
}

App.propTypes = {
    config: PropTypes.object.isRequired
}

export default App
