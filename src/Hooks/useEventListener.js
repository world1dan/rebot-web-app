import { useEffect } from 'react'

const useEventListener = (event, eventHandler, element = document, options) => {
    useEffect(() => {
        element.addEventListener(event, eventHandler, options)

        return () => {
            element.removeEventListener(event, eventHandler, options)
        }
    }, [event])
}

export default useEventListener
