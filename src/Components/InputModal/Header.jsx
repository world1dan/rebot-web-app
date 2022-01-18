import React from 'react'
import { css } from '@linaria/core'


const styles = css`
    display: flex;
    gap: 14px;
    align-items: center;

    .subject {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 42px;
        padding: 0 24px;
        font-weight: bold;
        font-size: 15px;
        background: var(--bg4);
        border-radius: 7px;
    }

    .date {
        display: flex;
        gap: 8px;
        align-items: center;
        color: var(--text2);
        font-weight: 600;
        font-size: 17px;
    }
`


const Header = ({ subject, date }) => {

    return (
        <header className={styles}>
            <div className='subject' style={{ backgroundColor: subject.color }}>
                {subject.full_title || subject.title}
            </div>
            <div className='date'>
                <i className="fas fa-calendar-day"></i>
                { date }
            </div>
        </header>
    )
}


export default Header
