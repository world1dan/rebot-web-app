import { forwardRef } from 'react'
import ModalPortal from '../ModalPortal'

import './style.css'

export default forwardRef(function Backdrop(props, ref) {
    return (
        <ModalPortal>
            {props.children}
            <div
                ref={ref}
                onClick={props.onClick}
                className={props.active ? 'backdrop' : ''}
            />
        </ModalPortal>
    )
})
