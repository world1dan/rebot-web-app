import { useRef, useEffect, ReactNode, FC } from 'react'
import { css } from '@linaria/core'

import fixScroll from '../Utils/fixScroll'
import getPlatform from '../Utils/getPlatform'

const styles = css`
    height: 100%;

    .VScroll {
        height: 100%;
        overflow-y: overlay;
        overscroll-behavior: contain;
        overscroll-behavior-block: contain;
        padding-bottom: 40px;

        &::-webkit-scrollbar {
            width: 0px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: var(--bg4);
            border-radius: 8px;
        }
    }
`

export interface IVScrollProps {
    children: ReactNode
}

const VScroll: FC<IVScrollProps> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const platform = getPlatform()

        if (platform == 'ios') {
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
