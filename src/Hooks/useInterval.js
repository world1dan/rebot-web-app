import { useEffect } from 'react'

const useInterval = (callback, interval) => {
    useEffect(() => {
        callback()
        const int = setInterval(callback, interval)

        return () => clearInterval(int)
    }, [])
}

export default useInterval
