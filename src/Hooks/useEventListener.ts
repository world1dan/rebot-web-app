import { useEffect } from 'react'

const useEventListener = (
    event: string,
    eventHandler: (event: Event) => void,
    element: HTMLElement | Document = document,
    options: AddEventListenerOptions
) => {
    useEffect(() => {
        element.addEventListener(event, eventHandler, options)

        return () => {
            element.removeEventListener(event, eventHandler, options)
        }
    }, [event])
}

export default useEventListener
