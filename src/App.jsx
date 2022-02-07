import { useEffect } from 'react'

import { TimeTableContext, manifestContext, MarksContext } from './Context'

import useServiceWorker from './Hooks/useServiceWorker'
import useSubjectsManifest from './Hooks/useSubjectsManifest'
import useFirestoreListener from './Hooks/useFirestoreListener'
import analyticsEvent from 'Utils/analyticsEvent'
import Tabs from './Tabs'

import './style.scss'

const App = ({ config }) => {
    const timetable = useFirestoreListener(config.database.timetable)
    const marks = useFirestoreListener(config.database.marks)

    const manifest = useSubjectsManifest()

    const { updateFounded } = useServiceWorker(true, true)

    useEffect(() => {
        analyticsEvent({
            type: 'app-openned',
            username: config.user.first_name ?? null,
            UUID: config.user,
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

    if (!manifest) return null

    return (
        <>
            <div id="modals-container"></div>
            <manifestContext.Provider value={manifest}>
                <MarksContext.Provider value={marks}>
                    <TimeTableContext.Provider value={timetable}>
                        <Tabs config={config} updateFounded={updateFounded} />
                    </TimeTableContext.Provider>
                </MarksContext.Provider>
            </manifestContext.Provider>
        </>
    )
}

export default App
