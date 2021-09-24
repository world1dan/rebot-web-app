import React from 'react';

export default function NavButton(props) {
    return (
        <button onClick={props.setActiveTab} className={"NavButton " + (props.isActive ? "active" : "")}>
            { <props.icon/> }
            { props.title }
        </button>
    )
}