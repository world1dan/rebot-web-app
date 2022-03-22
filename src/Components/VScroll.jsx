import { useRef, useEffect } from 'react'
import { css } from '@linaria/core'

import fixScroll from '../Utils/fixScroll'

const styles = css`
    height: 100%;

    .VScroll {
        height: 100%;
        overflow-y: auto;
        overscroll-behavior: contain;

        &::-webkit-scrollbar {
            width: 0;
        }
    }
`

const VScroll = ({ children, disableOverscrollContain }) => {
    const ref = useRef(null)

    useEffect(() => {
        if (window.ios && !disableOverscrollContain) {
            fixScroll(ref.current)
        }
    }, [])

    return (
        <div className={styles}>
            <div className="VScroll" ref={ref}>
                {children}
            </div>
        </div>
    )
}

export default VScroll
