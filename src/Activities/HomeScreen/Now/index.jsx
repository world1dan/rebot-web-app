import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { motion, AnimatePresence } from 'framer-motion'

import { manifestContext, ConfigContext } from '../../../Context'
import useCurrentLessonNum from './useCurrentLessonNum'

import TimeLeft from './TimeLeft'

import LessonInfo from '../../TimeTable/DayCard/LessonInfo'
import HomeworkRe from '../../HomeworkRe'
import Marks from './Marks'

import Homework from './Homework'

import './style.scss'

const Now = (props) => {
    const manifest = useContext(manifestContext)

    const user = useContext(ConfigContext).user

    const [instant, setInstant] = useState(false)
    const [info, setInfo] = useState(false)
    const actualLesson = useCurrentLessonNum() ?? {}

    let lesson = props.dayData[actualLesson.num] ?? {}
    let path = `${props.pathToDay}.${actualLesson.num}`

    if (lesson.groups) {
        if (lesson[user.group]) {
            lesson = lesson[user.group]
            path = `${props.pathToDay}.${actualLesson.num}.${user.group}`
        } else {
            lesson = null
        }
    }

    const subject = manifest[lesson?.id] ?? {}

    if (!actualLesson.num || !lesson || !subject.title) return null

    const isMath = lesson.id == 'alg' || lesson.id == 'geom'

    return (
        <>
            <AnimatePresence initial={false}>
                <motion.div
                    key={lesson.id}
                    className="Now"
                    exit={{ x: '-100%', position: 'absolute' }}
                    initial={{ x: '100%', position: 'absolute' }}
                    animate={{ x: 0, position: 'static' }}
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
                            <Homework path={path} lesson={lesson} />
                        </div>

                        <TimeLeft
                            strokeColor={subject.color}
                            actualLesson={actualLesson}
                        />
                    </div>

                    <div className="tool-btns-wraper">
                        {subject.url && lesson.hw && (
                            <button
                                className="tool-btn"
                                onClick={() => setInstant(true)}
                            >
                                <i className="fas fa-book"></i>
                                Решение
                            </button>
                        )}
                        <button
                            className="tool-btn"
                            onClick={() => setInfo(true)}
                        >
                            <i className="fas fa-info-circle"></i>
                            Об уроке
                        </button>
                    </div>

                    <Marks subject={isMath ? manifest['math'] : subject} />
                </motion.div>
            </AnimatePresence>

            {instant && (
                <HomeworkRe
                    lessonsData={[lesson]}
                    handleClose={() => setInstant(false)}
                />
            )}
            {info && (
                <LessonInfo
                    path={path}
                    lesson={isMath ? { ...lesson, id: 'math' } : lesson}
                    subject={isMath ? manifest['math'] : subject}
                    handleClose={() => setInfo(false)}
                />
            )}
        </>
    )
}

Now.propTypes = {
    dayData: PropTypes.object.isRequired,
    pathToDay: PropTypes.string.isRequired,
}

export default Now
