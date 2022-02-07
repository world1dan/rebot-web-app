import { useContext } from "react"
import { updateDoc } from "firebase/firestore"

import { ConfigContext } from "../../../../Context"



const useLessonController = (lesson, path) => {
    const config = useContext(ConfigContext)

    const timetableDoc = config.database.timetable
    const user = config.user



    const setHomework = (value) => {
        if (value !== lesson.hw) {
            updateDoc(timetableDoc, {
                [path + ".hw"]: value == undefined ? lesson.hw : value,
                [path + ".changedBy"]: user.first_name || user.last_name || user.username || user.id,
            })
        }
    }

    const setDanger = (state) => {
        updateDoc(timetableDoc, {
            [path + ".danger"]: state
        })
    }

    const setLink = (url) => {
        updateDoc(timetableDoc, {
            [path + ".link"]: url
        })
    }



    return { setHomework, setDanger, setLink }

}





export default useLessonController

