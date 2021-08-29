import React, { useContext } from 'react'

import { settingsContext } from '../../../../Context';

import Dropdown from '../../../Elements/Dropdown'


function RowContextMenu(props) {

    const settings = useContext(settingsContext);
    
    return (
        <Dropdown>
            { props.isResheba && props.homework && !settings.stealth &&
            <button className="withIcon" onClick={props.openInstant}>
                <i className="fas fa-book"></i>
                <span>Решебник</span>
            </button>
            }
            <button className="withIcon" onClick={props.setTest}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="var(--text)"><path d=""/></svg>
                <span>{ props.isTest ? "Не контрольная" : "Контрольная" }</span>
            </button>
            <button className="withIcon" onClick={props.copy}>
                <i className="fas fa-clone"></i>
                <span>Скопировать</span>
            </button>
        </Dropdown>
    )
}


export default RowContextMenu;
