import { useContext, useState, memo } from 'react'
import { ConfigContext } from '../../../Context'

import Card from '../../../Components/Blocks/Card'
import HomeworkRe from '../../HomeworkRe'
import Lesson from './Lesson'
import Search from '../../../Components/Icons/Search'
import Share from './Share'

import { ILesson, IWeekDay } from '../../../types'

export interface DayCardProps {
    dayNum: number
    week: number
    timetable: IWeekDay
    pathToDay: string
    shareMode?: boolean
}

const DayCard = ({
    dayNum,
    week,
    timetable,
    pathToDay,
    shareMode = false,
}: DayCardProps) => {
    const [homeworkRe, setHomeworkRe] = useState<boolean | (ILesson | ILesson[])[]>(false)

    const context = useContext(ConfigContext)

    if (!context.user) return null

    const group = context.user.group

    const date = new Date()
    const weekDay = date.getDay()

    let mult = 0

    if (week == 1) {
        mult = -7
    } else if (week == 3) {
        mult = 7
    }

    const distance = dayNum + mult - (weekDay != 0 ? weekDay : 7)

    date.setDate(date.getDate() + distance)

    const dateTitle = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
    })

    const weekDayTitle = date.toLocaleString('ru-RU', { weekday: 'long' })

    const lessons = []

    for (let lessonNum in timetable) {
        const lessonInfo = timetable[lessonNum]

        let lesson, path

        if (lessonInfo.groups) {
            if (lessonInfo[group]) {
                lesson = lessonInfo[group]
                path = `${pathToDay}.${lessonNum}.${group}`
            } else break
        } else {
            lesson = lessonInfo
            path = `${pathToDay}.${lessonNum}`
        }

        lessons.push(
            <Lesson key={lessonNum} lesson={lesson} path={path} shareMode={shareMode} />
        )
    }

    const openHomeworkRe = () => {
        const toOpen = []

        for (let lessonNum in timetable) {
            const lessonInfo = timetable[lessonNum]

            if (lessonInfo.groups) {
                if (lessonInfo[group]) {
                    let lesson = lessonInfo[group]
                    lesson.hw && toOpen.push(lesson)
                }
            } else {
                lessonInfo.hw && toOpen.push(lessonInfo)
            }
        }

        if (toOpen.length > 0) {
            setHomeworkRe(toOpen)
        } else {
            if (context.setStatusBar) {
                context.setStatusBar({
                    title: 'Решебники не найдены',
                    type: 'error',
                })
            }
        }
    }

    return (
        <Card title={weekDayTitle} subTitle={dateTitle}>
            {!shareMode && (
                <>
                    <Share dayCardProps={{ dayNum, week, timetable, pathToDay }} />
                    <button
                        className="table-btn"
                        onClick={openHomeworkRe}
                        style={{
                            right: 54,
                        }}
                    >
                        <Search width={20} height={20} />
                    </button>
                </>
            )}

            <div className="content">{lessons}</div>
            {homeworkRe && (
                <HomeworkRe
                    lessonsData={homeworkRe}
                    handleClose={() => setHomeworkRe(false)}
                />
            )}
        </Card>
    )
}

export default memo(
    DayCard,
    (prewProps, nextProps) => JSON.stringify(prewProps) == JSON.stringify(nextProps)
)
