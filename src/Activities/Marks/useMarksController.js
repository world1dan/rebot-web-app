import { setDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { useContext } from "react"
import { ConfigContext } from "Context"
import { SubjectMarkContext } from "./QuarterMarks/SubjectMarks/SubjectMarksContext"



const useMarksController = (subject) => {
    const marks = useContext(SubjectMarkContext)
    const database = useContext(ConfigContext).database


    const updateMark = (mark, update) => {
        const updatedMarks = marks.map((m) => {
            if (m.time == mark.time) {
                return {...m, ...update}
            } else {
                return m
            }
        })

        setDoc(database.marks, {
            [subject.id]: updatedMarks
        }, { merge: true })
    }


    const addQuarterMark = (mark, importance) => {
        const obj = {
            mark,
            time: Date.now(),
        }

        if (importance) {
            obj.imp = importance
        }
    
        setDoc(database.marks, {
            [subject.id]: arrayUnion(obj)
        }, { merge: true })
    }

    const removeQuarterMark = (mark) => {
        setDoc(database.marks, {
            [subject.id]: arrayRemove(mark)
        }, { merge: true })
    }

    const changeMarkTarget = (mark) => {
        setDoc(database.marks, {
            ["marksTargets"]: {
                [subject.id]: mark
            }
        }, { merge: true })
    }


    const setYearMark = (mark, quarter) => {
        setDoc(database.yearMarks, {
            [subject.id]: {
                [quarter]: mark
            }
        }, { merge: true })
    }

    const removeYearMark = (quarter) => {
        setDoc(database.yearMarks, {
            [subject.id]: {
                [quarter]: null
            }
        }, { merge: true })
    }


    return { 
        updateMark, 
        addQuarterMark, 
        removeQuarterMark, 
        changeMarkTarget, 
        setYearMark, 
        removeYearMark 
    }
}


export default useMarksController