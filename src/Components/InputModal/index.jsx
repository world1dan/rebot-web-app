import React, { useState, useRef, useEffect, useContext } from 'react'
import css from './style.module.scss'

import { manifestContext } from '../../Context'

import Backdrop from 'Components/Backdrop'
import TextareaAutosize from 'react-textarea-autosize'
import Shortcuts from './Shortcuts'
import Header from './Header'
import Importance from './Importance'


export const InputModal = ({ handleClose, handleSave, initialValue, lesson, handleDangerChange, date }) => {
    const manifest = useContext(manifestContext)
    const subject = manifest[lesson.id]

    const backdrop = useRef(null)
    const modal = useRef(null)
    const textarea = useRef(null)

    const [value, setValue] = useState(initialValue)


    useEffect(() => {
        backdrop.current.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 320,
            fill: "forwards"
        })
    }, [])


    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const save = () => {
        closeModal()
        handleSave(value)
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
            modal.current.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(-100%)' }
            ], {
                duration: 500,
                fill: "forwards",
                easing: 'cubic-bezier(0.38, 0.7, 0.125, 1)'
            }).onfinish = handleClose

            backdrop.current.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 120,
                fill: "forwards"
            })
        }
    }


    return (
        <Backdrop active={true} ref={backdrop} onClick={closeModal}>
            <div className={css.modal} ref={modal}>
                <Header subject={subject} date={date}/>
    
                <TextareaAutosize
                    ref={textarea}
                    autoFocus
                    value={value}
                    className={css.inputField}
                    onChange={handleChange}
                    spellCheck="false"
                    type='number'
                    maxRows={6}
                    onFocus={(e) => {
                        e.target.setSelectionRange(value.length, value.length)
                        setTimeout(() => {
                            e.target.style.caretColor = subject.color
                        }, 380)
                    }}  
                />

                <Shortcuts setValue={setValue} focusOnTextarea={focusOnTextarea}/>
                <Importance danger={lesson.danger} handleDangerChange={handleDangerChange}/>

                <div className={css.actionButtons}>
                    <button style={{ color: "var(--red2)"}} onClick={clear}>Очистить</button>
                    <button onClick={closeModal}>Отмена</button>
                    <button onClick={save}>Сохранить</button>
                </div>
            </div>
        </Backdrop>
    )
}
