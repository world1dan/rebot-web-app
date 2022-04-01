import { useEffect } from 'react'

import { TimeTableContext, manifestContext, MarksContext } from './Context'

import useSubjectsManifest from './Hooks/useSubjectsManifest'
import useFirestoreListener from './Hooks/useFirestoreListener'
import analyticsEvent from './Utils/analyticsEvent'
import Loading from './Components/Loading'
import Tabs from './Tabs'

import './colors.css'
import './style.scss'

const App = ({ config }) => {
    const timetable = useFirestoreListener(config.database.timetable)
    const marks = useFirestoreListener(config.database.marks)

    const manifest = useSubjectsManifest()

    useEffect(() => {
        analyticsEvent({
            type: 'app-openned',
            username: config.user.first_name ?? null,
            UUID: config.user.id,
            UA: navigator.userAgent,
        })

        window.addEventListener('error', (e) => {
            analyticsEvent({
                type: 'app-error',
                error: e.message,
                username: config.user.first_name ?? null,
                UUID: config.user.id,
            })
        })
    }, [])

    if (!manifest)
        return (
            <Loading
                styles={{
                    height: '100vh',
                }}
            />
        )

    return (
        <manifestContext.Provider value={manifest}>
            <div id="modals-container" />
            <MarksContext.Provider value={marks}>
                <TimeTableContext.Provider value={timetable}>
                    <Tabs config={config} />
                </TimeTableContext.Provider>
            </MarksContext.Provider>
        </manifestContext.Provider>
    )
}

export default App
