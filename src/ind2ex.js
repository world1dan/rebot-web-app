
import React, { useState } from 'react'
import { render } from 'react-dom'

import { css } from '@linaria/core';
import { styled } from '@linaria/react';


// Write your styles in `css` tag
const One = styled.div`
    font-size: 10;
    background-color: #000;
    padding: 10px;
    color: #fff;
    border-radius: 10px;
    margin-top: 8px;
`




const DG = () => {
    let array = []

    for (let i = 0; i < 200; i++) {
        array[i] = i;
    }

    const el = array.map((i) => {
        return (
            <One key={i}>{i}s21312313123123123sadasasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd</One>
        )
    })


    return (
        el
    )
}
const AppWrapper = () => {

    const [open, setOpen ] = useState(false)
    return (
        <>
        <button onClick={() => setOpen(!open)}>2323233223</button>
        { open && <DG/> }
        </>
    )
}

render(<AppWrapper />, document.getElementById('root'))


