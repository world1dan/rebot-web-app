import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'

const Search = forwardRef((props, ref) => {

    const [value, setValue] = useState("");
    const input = useRef(null);

    useImperativeHandle(ref, () => ({
        focus() {
            input.current.focus();
        }
    }))

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleBlur() {
        document.removeEventListener('keydown', handleEnter);

        if (props.autoClear) setValue("");
        if (props.onBlur) props.onBlur(value);
        
    }

    function handleFocus() {
        document.addEventListener('keydown', handleEnter);
    }

    function handleEnter(e) {
        if (e.code == 'Enter') {
            e.target.blur();
            
            if (props.autoClear) setValue("");
            if (props.onEnter) props.onEnter(value);
        }
    }

    return (
        <input
            ref={input}
            value={value}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            type={props.type}
            inputMode={props.inputMode}/>
    )
});

Search.displayName = 'Search';

export default Search;
