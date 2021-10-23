import { useState } from "react"


const useTransition = (element) => {
    const [currentState, setCurrentState] = useState({})


    const startTransition = (targetState, config, onTransitionEnd) => {
        element.current.animate([
            currentState,
            targetState
        ], {
            duration: config.duration ?? 500,
            fill: config.fill ?? "forwards",
            easing: config.easing ?? "ease-in-out"
        }).onfinish = onTransitionEnd

        setCurrentState(targetState)
    }


    return startTransition
}



export default useTransition