import React from 'react'
import { css } from '@linaria/core'

import { CheckBox } from '../Blocks/Switch/Checkbox'

const styles = css`
    display: grid;
    grid-template-columns: 42px 1fr 60px;
    gap: 10px;
    align-items: center;
    font-size: 13px;

    span {
        color: var(--text2);
    }

    i {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 10px;
        font-size: 18px;
        background: var(--bg4);
        border-radius: 7px;
    }

    .checkbox {
        font-size: 33px;
    }
`


const Importance = ({ danger, handleDangerChange }) => {

    return (
        <div className={styles}>
            <i className="fas fa-exclamation-circle"></i>
            <span>Отметить, что на этом уроке к/р или самостоялка</span>
            <div className='checkbox'>
                <CheckBox
                    checked={danger}
                    onChange={handleDangerChange}
                />
            </div>
        </div>
    )
}


export default Importance