import { useState, useEffect } from 'react'

const getFromLocalStorage = (key: string, defaultValue?: any) => {
    const json = localStorage.getItem(key)

    return json ? JSON.parse(json) : defaultValue
}

const useLocalStorage = (key: string, defaultValue?: any) => {
    const [value, setValue] = useState(() => getFromLocalStorage(key, defaultValue))

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

export default useLocalStorage
