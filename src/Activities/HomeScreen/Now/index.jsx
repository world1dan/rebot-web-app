import React, { useContext, useEffect, useState } from 'react'
import PropTypes from "prop-types"

import { motion, AnimatePresence } from 'framer-motion'

import { manifestContext,ConfigContext, MarksContext } from '../../../Context'
import useCurrentLessonNum from './useCurrentLessonNum'
import { useTimetableUpdate } from '../../../Hooks/useTimetableUpdate'

import Progress from './Progress'
import LessonInfo from '../../TimeTable/Day/LessonInfo/LessonInfo'
import HomeworkRe from '../../HomeworkRe'
import EditableField from '../../../Components/EditableField'
import SubjectMarks from '../../Marks/QuarterMarks/SubjectMarks'

import "./style.scss"



const Now = (props) => {
    const manifest = useContext(manifestContext)
    const marks = useContext(MarksContext)

    const user = useContext(ConfigContext).user

    const update = useTimetableUpdate()
    const [homework, setHomework] = useState("")

    const [instant, setInstant] = useState(false)
    const [info, setInfo] = useState(false)

    const actualLesson = useCurrentLessonNum() ?? {}

    const percent = 100 - (100 / (actualLesson.timeInterval / actualLesson.left))

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


    useEffect(() => {
        if (lesson && lesson.hw !== homework) { 
            setHomework(lesson.hw)
        }
    }, [lesson])


    if (!actualLesson.num || !lesson || !subject.title) return null


    const isMath = lesson.id == "alg" || lesson.id == "geom"

    const saveHomework = (hw) => {
        if (hw !== lesson.hw) {
            update({
                [path + ".hw"]: hw,
                [path + ".changedBy"]: user.first_name || user.last_name || user.username || user.id,
            })
        }
    }

    
    return (
        <>
            <AnimatePresence initial={false}>
                <motion.div 
                    key={lesson.id}
                    className="Now"
                    exit={{ x: "-100%", position: "absolute" }}
                    initial={{ x: "100%", position: "absolute" }}
                    animate={{ x: 0, position: "static" }}>

                    <div className="actual-lesson-info">
                        
                        <div className="left-block">
                            <h5 className="block-title">{ actualLesson.type == "toEnd" ? "СЕЙЧАС" : "СЛЕДУЮЩИЙ УРОК"}</h5>
                            <h3 className="subject-title">{ subject.full_title || subject.title }</h3>
                            <div className="homework">
                                <EditableField 
                                    value={homework} 
                                    onChange={setHomework} 
                                    onSave={saveHomework}
                                />
                            </div>
                        </div>
                        
                        <div className="progress-wraper">
                            <Progress strokeColor={subject.color} percents={percent} timeLeft={actualLesson.left}/>
                        </div>
                    </div>

                    <div className="tool-btns-wraper">
                        { subject.url && lesson.hw &&
                            <button className="tool-btn" onClick={() => setInstant(true)}>
                                <i className="fas fa-book"></i>
                                Решение
                            </button> }
                        { (subject?.url || subject.marks || isMath) &&
                            <button className="tool-btn" onClick={() => setInfo(true)}>
                                <i className="fas fa-info-circle"></i>
                                Об уроке
                            </button> }
                    </div>
                    
                    { marks && 
                        <div className="marks-wraper">
                            <h5 className="block-title">ОЦЕНКИ</h5>
                            <SubjectMarks 
                                marks={marks?.[isMath ? 'math' : lesson.id] ?? []} 
                                subject={isMath ? manifest['math'] : subject} 
                                target={marks?.['marksTargets']?.[subject.id]}
                                embedded
                            />
                        </div>
                    }

                </motion.div>
            </AnimatePresence>

            { instant && <HomeworkRe lessonsData={[lesson]} handleClose={() => setInstant(false)}/> }

            { info && 
                <LessonInfo 
                    update={update} 
                    path={path} 
                    lesson={isMath ? {...lesson, id: "math"} : lesson} 
                    subject={isMath ? manifest["math"] : subject} 
                    handleClose={() => setInfo(false)}
                /> }
        </>
    )
}



Now.propTypes = {
    dayData: PropTypes.object.isRequired,
    pathToDay: PropTypes.string.isRequired
}

export default Now