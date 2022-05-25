import { useContext } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { manifestContext, ConfigContext } from '../../../Context'
import useCurrentLessonNum from './useCurrentLessonNum'

import TimeLeft from './TimeLeft'
import Marks from './Marks'
import Homework from '../../TimeTable/DayCard/Lesson/Homework'
import LessonTools from './LessonTools'

import './style.scss'

const Now = ({ dayData, pathToDay }) => {
    const manifest = useContext(manifestContext)
    const user = useContext(ConfigContext).user

    const actualLesson = useCurrentLessonNum() ?? {}

    let lesson = dayData[actualLesson.num] ?? {}
    let path = `${pathToDay}.${actualLesson.num}`

    if (lesson.groups) {
        if (lesson[user.group]) {
            lesson = lesson[user.group]
            path = `${pathToDay}.${actualLesson.num}.${user.group}`
        } else {
            lesson = null
        }
    }

    const subject = manifest[lesson?.id] ?? {}

    if (!actualLesson.num || !lesson || !subject.title) return null

    const isMath = lesson.id == 'alg' || lesson.id == 'geom'

    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <AnimatePresence initial={false}>
                <motion.div
                    key={lesson.id}
                    className="Now"
                    exit={{
                        x: '-100%',
                        opacity: 0,
                        position: 'absolute',
                    }}
                    initial={{ x: '100%', position: 'absolute', opacity: 0 }}
                    animate={{
                        x: 0,
                        position: 'static',
                        opacity: 1,
                    }}
                    transition={{ duration: 0.5, type: 'spring' }}
                >
                    <div className="actual-lesson-info">
                        <div className="left-block">
                            <h5 className="block-title">
                                {actualLesson.type == 'toEnd'
                                    ? 'СЕЙЧАС'
                                    : 'СЛЕДУЮЩИЙ УРОК'}
                            </h5>
                            <h3 className="subject-title">
                                {subject.full_title || subject.title}
                            </h3>
                            <Homework path={path} lesson={lesson} large />
                        </div>

                        <TimeLeft
                            strokeColor={subject.color}
                            actualLesson={actualLesson}
                        />
                    </div>

                    <LessonTools
                        subject={subject}
                        lesson={lesson}
                        path={path}
                        isMath={isMath}
                        manifest={manifest}
                    />

                    <Marks subject={isMath ? manifest['math'] : subject} />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default Now
