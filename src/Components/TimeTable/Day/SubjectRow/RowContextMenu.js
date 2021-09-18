import React from 'react'

import Dropdown from '../../../Elements/Dropdown'


function RowContextMenu(props) {
    
    return (
        <Dropdown>
            { props.isResheba && props.homework &&
            <button className="withIcon" onClick={props.openInstant}>
                <i className="fas fa-book"></i>
                <span>Решение</span>
            </button>
            }
            <button className="withIcon" onClick={props.copy}>
                <i className="fas fa-clone"></i>
                <span>Скопировать</span>
            </button>
        </Dropdown>
    )
}


export default RowContextMenu;
