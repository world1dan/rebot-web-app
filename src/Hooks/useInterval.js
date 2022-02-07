import { useEffect } from 'react'

const useInterval = (callback, interval) => {
    useEffect(() => {
        const int = setInterval(callback, interval)

        return () => clearInterval(int)
    })
}

export default useInterval
