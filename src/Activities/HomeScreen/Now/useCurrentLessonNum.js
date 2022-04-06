import { useState } from 'react'
import useInterval from '../../../Hooks/useInterval'
import { getCurrentLessonNum } from './utils'

export default function useCurrentLessonNum() {
    const [currentLesson, setCurrentLesson] = useState(getCurrentLessonNum)

    useInterval(() => {
        setCurrentLesson(getCurrentLessonNum)
    }, 1000)

    return currentLesson
}
