import { useRef, useEffect } from 'react'
import { css } from '@linaria/core'
import fixScroll from '../Utils/fixScroll'

const styles = css`
    overflow-y: overlay;
    height: var(--save-height);
    padding: 8px;
    padding-bottom: 14px;
    padding-top: 14px;
    padding-left: max(env(safe-area-inset-left), 10px);
    padding-right: max(env(safe-area-inset-right), 10px);
    width: 100%;

    @media (max-width: 360px) {
        padding: 0 8px;
    }

    &.withoutPaddings {
        padding: 0;
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
    }

    overscroll-behavior: contain;

    &::-webkit-scrollbar {
        width: 0px;
    }
`

const ScrollView = ({ children, className, withoutPaddings }) => {
    const ref = useRef(null)

    useEffect(() => {
        if (window.ios) {
            fixScroll(ref.current)
        }
    }, [])
    return (
        <div
            className={
                styles +
                ' ' +
                (className ?? '') +
                (withoutPaddings ? ' withoutPaddings' : '')
            }
            ref={ref}
        >
            {children}
        </div>
    )
}

export default ScrollView
