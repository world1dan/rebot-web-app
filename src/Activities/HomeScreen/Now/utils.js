const ringsTimetable = [
    ["8.00", "8.45"],
    ["8.55", "9.40"],
    ["9.55", "10.40"],
    ["10.55", "11.40"],
    ["11.55", "12.40"],
    ["12.50", "13.35"],
    ["13.55", "14.40"],
]



/*

const ringsTimetable = [
    ["8.00", "8.45"],
    ["8.55", "9.40"],
    ["9.55", "10.40"],
    ["10.55", "11.40"],
    ["11.55", "12.40"],
    ["12.50", "13.35"],
    ["13.55", "14.40"],
]*/





export function convertTime(millis) {
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
}


export function getCurrentLessonNum() {

    let num, left, type, timeInterval = null

    for (let i = 0; i < 7; i++) {
        const range = ringsTimetable[i]

        const start = range[0].split(".")
        const end = range[1].split(".")

        const lessonStart = new Date().setHours(start[0], start[1], 0)
        const lessonEnd = new Date().setHours(end[0], end[1], 0)
        const now = new Date()


        if (lessonStart <= now && now <= lessonEnd) {
            num = i + 1

            left = lessonEnd-now
            type = "toEnd"
            timeInterval = "2700000"

        } else if (lessonStart >= now && !num) {
            num = i + 1

            left = lessonStart-now
            type = "toStart"

            if (i == 1 || i == 5) {
                timeInterval = 600000
            } else if (i == 6) {
                timeInterval = 1200000
            } else {
                timeInterval = 900000
            }
        }
    }


    return { num, type, left, timeInterval }
}