import React from 'react'
import { css } from '@linaria/core'

import AddLink from './AddLink'

const styles = css`
    display: flex;
    gap: 14px;
    align-items: center;
    justify-content: space-between;

    .subject {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        padding: 0 40px;
        font-weight: bold;
        font-size: 15px;
        background: var(--bg4);
        border-radius: 7px;
    }
`


const Header = ({ subject, setLink, lesson  }) => {

    return (
        <header className={styles}>
            <div className='subject' style={{ backgroundColor: subject.color }}>
                {subject.full_title || subject.title}
            </div>
            <AddLink setLink={setLink} currentLink={lesson.link}/>
        </header>
    )
}


export default Header
