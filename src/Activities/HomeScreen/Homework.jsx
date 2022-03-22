import { useContext, useState } from 'react'

import { manifestContext } from '../../Context'

import { motion } from 'framer-motion'

import { RoundedCheckbox } from '../../Components/Blocks/RoundedCheckbox'
import { styled } from '@linaria/react'

const Block = styled(motion.div)`
    background: var(--bg2);
    border-radius: 7px;
    min-height: 100px;

    display: grid;
    padding: 6px;
    grid-template-columns: 5px 1fr 70px;
    opacity: ${(p) => (p.isCompleted ? '0.8' : '')};
    transform: scale(${(p) => (p.isCompleted ? '0.97' : '')});
    .color-indicator {
        border-radius: 3px;
        background: ${(p) => p.subjectColor};
    }

    .task-checkbox {
        border-left: 3px var(--bg4) solid;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    transition-duration: 0.4s;

    .task-info {
        text-decoration: ${(p) => (p.isCompleted ? 'line-through' : '')};
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        overflow-x: auto;
        .task {
            font-weight: 600;
            font-size: 19px;
            overflow-x: auto;
        }
        .subject {
            font-size: 16px;
            color: var(--text2);
            font-weight: 600;
        }
    }
`

const TaskBlock = ({ subject, task }) => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <Block subjectColor={subject.color} isCompleted={isChecked}>
            <div className="color-indicator"></div>
            <div className="task-info">
                <div className="task">{task}</div>
                <div className="subject">{subject.title}</div>
            </div>
            <div
                className="task-checkbox"
                onClick={() => setIsChecked(!isChecked)}
            >
                <RoundedCheckbox
                    isChecked={isChecked}
                    handleChange={setIsChecked}
                />
            </div>
        </Block>
    )
}

const Homework = ({ timetable, isWeekEnded, dayNum }) => {
    const manifest = useContext(manifestContext)
    const tasks = []

    const day = timetable[isWeekEnded ? 3 : 2][dayNum]

    let mult = 0

    if (isWeekEnded) {
        mult = 7
    }
    const date = new Date()
    const weekDay = date.getDay()
    const distance = dayNum + mult - (weekDay != 0 ? dayNum : 7)

    date.setDate(date.getDate() + distance)

    const dateTitle = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
    })
    const weekDayTitle = date.toLocaleString('ru-RU', { weekday: 'long' })

    console.log(dateTitle, weekDayTitle)

    for (let lessonNum in day) {
        const lesson = day[lessonNum]

        if (lesson.hw) {
            tasks.push({
                subject: manifest?.[lesson.id],
                task: lesson.hw,
                isCompleted: Math.random() == 1 ? false : true,
            })
        }
    }

    tasks.sort((a, b) => (a.isCompleted && !b.isCompleted ? 1 : -1))
    return (
        <>
            {tasks.map((t) => {
                return (
                    <TaskBlock
                        subject={t.subject}
                        task={t.task}
                        key={t.subject.id}
                    />
                )
            })}
        </>
    )
}

export default Homework
