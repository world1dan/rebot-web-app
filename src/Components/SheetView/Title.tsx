import { css } from '@linaria/core'
import { FC, ReactNode } from 'react'

const styles = css`
    text-align: center;
    font-size: 17px;
    font-weight: 600;
    height: 56px;
    display: grid;
    place-items: center;
`

export interface ITitleProps {
    children: ReactNode
}

const Title: FC<ITitleProps> = ({ children }) => {
    return <div className={styles}>{children}</div>
}

export default Title
