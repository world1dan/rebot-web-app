export const getAverage = (arr, round) => {
    const average = arr.reduce((a, b) => a + (round ? Math.round(b.mark) : b.mark), 0) / arr.length

    return isNaN(average) ? null : average
}



export const analyzeQuarterMarks = (marks) => {
    let numOfMarks = 0
    let numOfSubjectsWithMarks = 0
    const averageOfSubjects = []

    let targetOfQuarter

    for (let subj in marks) {

        if (subj == 'marksTargets') {
            let sum = 0
            let count = 0

            for (let s in marks.marksTargets) {
                const target = marks.marksTargets[s]
                sum += target 
                count++
            }

            const av = sum / count

            targetOfQuarter = isNaN(av) ? null : av

            continue
        }

        const average = getAverage(marks[subj])
        if (!average) continue

        averageOfSubjects.push({
            subj,
            mark: average
        })

        numOfSubjectsWithMarks += 1
        numOfMarks += marks[subj].length
    }

    const averageOfQuarter = getAverage(averageOfSubjects, true)


    return { averageOfQuarter, targetOfQuarter }
}

