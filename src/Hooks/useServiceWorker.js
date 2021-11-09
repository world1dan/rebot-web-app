import { useEffect, useState } from "react"

const useServiceWorker = () => {
    const [checking, setChecking] = useState(false)
    const [updateFounded, setUpdateFounded] = useState(false)


    useEffect(() => {
        try {
            const listener = navigator.serviceWorker.addEventListener("message", (e) => {
                const type = e.data.type
    
                setChecking(false)
    
                if (type == "update-complete") {
                    setUpdateFounded(true)
                }
            })
        
            return () => {
                navigator.serviceWorker.removeEventListener("message", listener)
            }
        } catch (e) {
            alert("Ошибка: Cant find active SW")
        }
        
    }, [])


    const checkForUpdates = () => {
        setChecking(true)
        navigator.serviceWorker.ready.then(registration => {
            registration.active.postMessage({ type: "run-updater" })
        })
    }


    return { updateFounded, checking, checkForUpdates }
}




export default useServiceWorker