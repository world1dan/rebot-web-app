import React from "react"
import { useState, useRef, useEffect } from "react"
import Backdrop from "Components/Backdrop"
import "./style.css"


export const ActionSheetContext = React.createContext(null)



const ActionSheet = ({ onClose, children }) => {

    const [closing, setClosing] = useState(false)
    const backdrop = useRef(null)

    const handleClose = () => {
        setClosing(true)

        backdrop.current.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 250,
            fill: "forwards"
        })
    }

    useEffect(() => {
        backdrop.current.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 400,
            fill: "forwards"
        })
    }, [])

    return (
        <Backdrop onClick={handleClose} ref={backdrop} active>
            <ActionSheetContext.Provider value={{ close: handleClose }}>
                <div className={'ActionSheet' +  (closing ? ' closing' : " ")} onAnimationEnd={closing ? onClose : null}>
                    { children }
                    <div className="ActionSheetCloseBtn" onClick={handleClose}>Закрыть</div>
                </div>
            </ActionSheetContext.Provider>
        </Backdrop>
    )
}


export default ActionSheet