import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from "react"
import PropTypes from "prop-types"


import "./style.css"



const EditableField = forwardRef(({ value, onSave, onChange }, ref) => {

    const [isEditing, setIsEditing] = useState(false)
    const editor = useRef(null)


    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            editor.current.blur()
        }
    }

    useEffect(() => {
        if (isEditing) {
            editor.current.addEventListener("keydown", handleEnter)
            document.body.classList.add("keyboard-active")
        } else {
            document.body.classList.remove("keyboard-active")
        }

    }, [isEditing])


    useImperativeHandle(ref, () => ({
        focus() {
            setIsEditing(true)
        }
    }))

    const saveValue = () => {
        onSave(editor.current.value)

        setIsEditing(false)
    }

    const changeValue = () => {
        onChange(editor.current.value)
    }


    return (
        <div className="editable-field" onClick={() => setIsEditing(true)}>
            { isEditing ?
                <input 
                    type="text"
    
                    value={value}
                    onChange={changeValue}
                    onBlur={saveValue}
                    ref={editor}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"/> :
                value
            }
        </div>

    )
     
})



EditableField.displayName = "EditableField"

EditableField.propTypes = {
    value: PropTypes.string.isRequired,
    onSave: PropTypes.func,
    onChange: PropTypes.func
}


export default EditableField