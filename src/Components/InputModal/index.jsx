import React, { useState, useRef, useEffect, useContext } from 'react'
import css from './style.module.scss'

import { manifestContext } from '../../Context'

import BackdropL from '../BackdropL'
import TextareaAutosize from 'react-textarea-autosize'
import Shortcuts from './Shortcuts'
import Header from './Header'
import Importance from './Importance'
import useLessonController from '../../Activities/TimeTable/DayCard/SubjectRow/useLessonController'

export const InputModal = ({ handleClose, lesson, path }) => {
    const manifest = useContext(manifestContext)
    const subject = manifest[lesson.id]

    const backdrop = useRef(null)
    const modal = useRef(null)
    const textarea = useRef(null)

    const [value, setValue] = useState(lesson.hw ?? '')
    const [isVisible, setIsVisible] = useState(true)

    const { setHomework, setLink, setDanger } = useLessonController(
        lesson,
        path
    )

    useEffect(() => {
        backdrop.current.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 320,
            fill: 'forwards',
        })
        textarea.current.setSelectionRange(value.length, value.length)
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const save = () => {
        closeModal()
        setHomework(value)
    }

    const clear = () => {
        setValue('')
        focusOnTextarea()
    }

    const focusOnTextarea = () => {
        textarea.current.focus()
    }

    const closeModal = () => {
        if (modal.current && backdrop.current) {
            modal.current.animate(
                [
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-100%)' },
                ],
                {
                    duration: 500,
                    fill: 'forwards',
                    easing: 'cubic-bezier(0.38, 0.7, 0.125, 1)',
                }
            ).onfinish = handleClose

            backdrop.current.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 120,
                fill: 'forwards',
            })
        }
        setIsVisible(false)
    }

    const insertIntoTextarea = (textToInsert) => {
        const [start, end] = [
            textarea.current.selectionStart,
            textarea.current.selectionEnd,
        ]

        const updatedValue =
            value.slice(0, start) +
            (end == value.length ? ' ' + textToInsert : textToInsert) +
            value.slice(end)

        setValue(updatedValue)
    }

    return (
        <BackdropL
            active={true}
            ref={backdrop}
            onClick={isVisible ? closeModal : null}
        >
            <div className={css.modal} ref={modal}>
                <Header subject={subject} setLink={setLink} lesson={lesson} />

                <TextareaAutosize
                    ref={textarea}
                    autoFocus
                    value={value}
                    className={css.inputField}
                    onChange={handleChange}
                    spellCheck="false"
                    type="number"
                    maxRows={6}
                    onFocus={(e) => {
                        setTimeout(() => {
                            e.target.style.caretColor = subject.color
                        }, 380)
                    }}
                />

                <Shortcuts
                    insertIntoTextarea={insertIntoTextarea}
                    focusOnTextarea={focusOnTextarea}
                />
                <Importance
                    danger={lesson.danger}
                    handleDangerChange={(e) => setDanger(e.target.checked)}
                />

                <div className={css.actionButtons}>
                    <button style={{ color: 'var(--red2)' }} onClick={clear}>
                        Очистить
                    </button>
                    <button onClick={closeModal}>Отмена</button>
                    <button onClick={save}>Сохранить</button>
                </div>
            </div>
        </BackdropL>
    )
}
