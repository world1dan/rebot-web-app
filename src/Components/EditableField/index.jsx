import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

import { InputModal } from "Components/InputModal"

import "./style.css"



const EditableField = ({ value, onSave, onChange, lesson, handleDangerChange, date }) => {

    const [isEditing, setIsEditing] = useState(false)
    //const editor = useRef(null)

/*
    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            editor.current.blur()
        }
    }

    const saveValue = () => {
        onSave(editor.current.value)
        setIsEditing(false)
    }

    const changeValue = () => {
        onChange(editor.current.value)
    }

*/


    const closeInputModal = () => {
        setIsEditing(false)
    }

    return (
        <>
        <div className="editable-field" onClick={() => setIsEditing(true)}>
            { value }
        </div>
        { isEditing && 
            <InputModal
                date={date}
                initialValue={value}
                handleSave={onSave}
                handleClose={closeInputModal}
                lesson={lesson}
                handleDangerChange={handleDangerChange}
            />
        }
        </>

    )
     
}


/*

isEditing ?
                <input
                    type="text"
                    value={value}
                    onChange={changeValue}
                    onBlur={saveValue}
                    onKeyDown={handleEnter}
                    ref={editor}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"/> :
                value*/

EditableField.propTypes = {
    value: PropTypes.string.isRequired,
    onSave: PropTypes.func,
    onChange: PropTypes.func
}


export default EditableField