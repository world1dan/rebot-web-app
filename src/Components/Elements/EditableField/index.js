import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';

import './style.scss';

function EditableField(props, ref) {

    const [isEditing, setIsEditing] = useState(false);

    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            editor.current.blur();
        }
    }

    useEffect(() => {
        if (isEditing) {
            editor.current.addEventListener("keydown", handleEnter)
        }
    }, [isEditing]);



    const editor = useRef(null);

    useImperativeHandle(ref, () => ({
        focus() {
            setIsEditing(true);
        }
    }));

    function saveValue() {
        props.onSave(editor.current.value);

        setIsEditing(false);
    }

    function changeValue() {
        props.onChange(editor.current.value);
    }

    return (
        <div className="editable-field" onClick={() => setIsEditing(true)}>
            { isEditing ?
                <input 
                    type="text"
                    
                    value={props.value}
                    onChange={changeValue}
                    onBlur={saveValue}
                    ref={editor}
                    autoFocus
                    autoComplete="off"/> :
                props.value
            }
        </div>

    )
     
}

export default forwardRef(EditableField);