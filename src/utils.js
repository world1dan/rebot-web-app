export const getCorrectLessonByGroup = (group, lessonInfo) => {
    let lesson, path

    if (lessonInfo.groups) {
        if (lessonInfo[group]) {
            lesson = lessonInfo[group]
            path = `${pathToDay}.${lessonNum}.${group}`
        } else return null
    } else {
        lesson = lessonInfo
        path = `${pathToDay}.${lessonNum}`
    }

    return { lesson, path }
}
// 40KB
// 39КБ
