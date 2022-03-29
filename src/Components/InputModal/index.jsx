import { useState, useRef, useEffect, useContext } from 'react'
import { css } from '@linaria/core'

import { manifestContext } from '../../Context'

import BackdropL from '../BackdropL'
import TextareaAutosize from 'react-textarea-autosize'
import Shortcuts from './Shortcuts'
import Header from './Header'
import Importance from './Importance'
import useLessonController from '../../Activities/TimeTable/DayCard/SubjectRow/useLessonController'
import Actions from './Actions'

const styles = css`
    animation: modal-in 0.5s cubic-bezier(0.38, 0.7, 0.125, 1) forwards;
    background-color: var(--bg2);
    display: grid;
    left: 0;
    min-height: 180px;
    padding: 10px;
    position: fixed;
    right: 0;
    row-gap: 12px;
    top: 0;
    touch-action: none;
    z-index: 1001;

    @media (min-width: 670px) {
        border-radius: 0 0 12px 12px;
        margin: 0 auto;
        max-width: 620px;
    }

    @keyframes modal-in {
        from {
            transform: translateY(-100%);
        }

        to {
            transform: translateY(0);
        }
    }

    .input-field {
        background-color: var(--bg4);
        border-radius: 7px;
        caret-color: transparent;
        font-size: 18px;
        margin: 0;
        padding: 10px;
        resize: none;
        user-select: auto;
    }
`

const InputModal = ({ handleClose, lesson, path }) => {
    const manifest = useContext(manifestContext)
    const subject = manifest[lesson.id]

    const backdrop = useRef(null)
    const modal = useRef(null)
    const textarea = useRef(null)

    const [value, setValue] = useState(lesson.hw ?? '')
    const [isVisible, setIsVisible] = useState(true)

    const { setHomework, setLink, setDanger } = useLessonController(lesson, path)

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
                [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }],
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

        const updatedValue = value.slice(0, start) + textToInsert + value.slice(end)

        setValue(updatedValue)

        requestAnimationFrame(() => {
            textarea.current.setSelectionRange(
                start + textToInsert.length,
                end + textToInsert.length
            )
        })
    }

    return (
        <BackdropL active={true} ref={backdrop} onClick={isVisible ? closeModal : null}>
            <div className={styles} ref={modal}>
                <Header subject={subject} setLink={setLink} lesson={lesson} />

                <TextareaAutosize
                    ref={textarea}
                    autoFocus
                    value={value}
                    className="input-field"
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

                <Actions clear={clear} closeModal={closeModal} save={save} />
            </div>
        </BackdropL>
    )
}

export default InputModal
