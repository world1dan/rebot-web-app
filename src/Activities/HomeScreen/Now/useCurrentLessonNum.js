import { useEffect, useState } from 'react'
import { getCurrentLessonNum } from './utils'

export default function useCurrentLessonNum() {
    const [currentLesson, setCurrentLesson] = useState(getCurrentLessonNum)

    useEffect(() => {
        const update = () => {
            setCurrentLesson(getCurrentLessonNum())
        }

        const interval = setInterval(update, 1000)

        return () => clearInterval(interval)
    }, [])

    return currentLesson
}
