import React from 'react';

import Time from "./Time";
import Rings from './Rings';

import "./style.scss";


export default function Header(props) {
    return (
        <header className="homescreen-header">
            <Time/>
            <button onClick={() => props.setSettingsOpen(true)}>
                <i className="fas fa-cog"></i>
            </button>
            <Rings/>
        </header>
    )
}
