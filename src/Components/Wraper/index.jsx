import React from 'react'
import VScroll from '../VScroll'

import './style.scss'

const Wraper = (props) => {
    return (
        <VScroll>
            <div
                className="tab-wraper"
                style={props.styles}
                className={'tab-wraper ' + (props.className ?? '')}
            >
                {props.children}
            </div>
        </VScroll>
    )
}

export default Wraper
