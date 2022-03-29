import { css } from '@linaria/core'
import React from 'react'
import VScroll from './Components/VScroll'

const styles = css`
    height: 60px;
    width: 100%;
    background: var(--bg4);
`

const styles2 = css`
    display: grid;
    gap: 5px;
    overflow: auto;
    height: var(--save-height);
`
const Block = () => {
    return <div className={styles}></div>
}

const styles3 = css`
    height: var(--save-height);
    display: flex;
    flex-direction: column;
`

const Test = () => {
    const array = new Array(50)
    array.fill(0)

    return (
        <div className={styles3}>
            <div style={{ height: 90, background: 'red' }} />
            <div className={styles2}>
                {array.map(() => (
                    <Block />
                ))}
            </div>
        </div>
    )
}

export default Test
