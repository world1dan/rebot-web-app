import { useEffect, useState, useContext } from "react"

import { firestore } from "../../../Context"
import { ConfigContext } from "../../../Context"
import { collectionGroup, onSnapshot } from "firebase/firestore"




const useRating = () => {
    const [usersRatings, setUsersRatings] = useState(null)
    const [statistics, setStatistics] = useState(null)

    const user = useContext(ConfigContext).user

    useEffect(() => {
        return onSnapshot(collectionGroup(firestore, 'userStorage'), (g) => {
            const data = []

            g.forEach((doc) => {
                if (doc.id !== "marks_new") return


                const d = doc.data()
                if (d) {
                    data.push({ marks: d, userUUID: doc.ref._key.path.segments[6] })
                }
            })
            let counter = 0
            let userMarksCounter = 0

            const usersRating = []

            data.forEach((userMarks) => {
                let quarterAverageSum = 0
                let quarterSubjects = 0


                for (let subj in userMarks.marks) {
                    try {
                        if (subj == 'marksTargets') continue
                        counter += userMarks.marks[subj].length

                        if (userMarks.userUUID == user.id) {
                            userMarksCounter += userMarks.marks[subj].length
                        }

                        let subjMarksSum = 0

                        for (let mark of userMarks.marks[subj]) {
                            subjMarksSum += mark.mark
                        }

                        let average = subjMarksSum / userMarks.marks[subj].length

                        if (!isNaN(average) && average <= 10) {
                            average = Number(average.toFixed(0))
                            quarterAverageSum += average
                            quarterSubjects += 1

                        } else {
                            average = null
                        }
                    } catch {
                        continue
                    }
                }
                try {
                    const rating = (quarterAverageSum / quarterSubjects).toFixed(2)
                    if (!isNaN(rating)) {
                        usersRating.push({
                            rating,
                            marks: userMarks.marks,
                            userUUID: userMarks.userUUID
                        })
                    }
                } catch {
                    return
                }
            })

            setStatistics({ globalMarksCount: counter, userMarksCounter })

            setUsersRatings(usersRating)
        })
    }, [])


    return [usersRatings, statistics]
}

export default useRating