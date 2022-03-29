import { useEffect, useState } from 'react'

const useServiceWorker = (checkForUpdatesOnMount, periodicChecking) => {
    const [checking, setChecking] = useState(false)
    const [updateFounded, setUpdateFounded] = useState(false)

    useEffect(() => {
        try {
            navigator.serviceWorker.addEventListener('message', (e) => {
                const type = e.data.type

                setChecking(false)

                if (type == 'update-complete') {
                    setUpdateFounded(true)
                }
            })
        } catch (e) {
            console.log('Ошибка: Cant find active SW')
            return
        }
        if (checkForUpdatesOnMount) {
            checkForUpdates()
        }
        if (periodicChecking) {
            const interval = setInterval(checkForUpdates, 600000)

            return () => clearInterval(interval)
        }
    }, [])

    const checkForUpdates = () => {
        console.info('Checking for updates...')

        if (!checkForUpdatesOnMount) {
            setChecking(true)
        }

        try {
            navigator.serviceWorker.ready.then((registration) => {
                registration.active.postMessage({ type: 'run-updater' })
            })
        } catch {
            console.log('Update check failed')
        }
    }

    return { updateFounded, checking, checkForUpdates }
}

export default useServiceWorker
