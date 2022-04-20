import { useEffect } from 'react'

const useInterval = (callback: VoidFunction, interval: number) => {
    useEffect(() => {
        callback()
        const int = setInterval(callback, interval)

        return () => clearInterval(int)
    }, [])
}

export default useInterval
