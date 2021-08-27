import React from 'react';

export default function NavButton(props) {
    return (
        <div onClick={props.setActiveTab} className={"NavButton " + (props.isActive ? "active" : "")}>
            <div>{ <props.icon/> }</div>
            <span>{ props.title }</span>
        </div>
    )
}