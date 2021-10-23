import { updateDoc } from "firebase/firestore"
import { useContext } from "react"
import { ConfigContext } from "../Context"

export const useTimetableUpdate = () => {

    const timetableRef = useContext(ConfigContext).database.timetable


    const update = (data) => {
        updateDoc(timetableRef, data)
    }


    return update
}