import { css } from '@linaria/core'
import { FC, ReactNode } from 'react'

const styles = css`
    display: flex;
    flex-direction: column;
    height: var(--save-height);
    padding-bottom: 4px;
`

export interface IWraperProps {
    children: ReactNode
    className?: string
}

const Wraper: FC<IWraperProps> = ({ children, className }) => {
    return <div className={styles + ' ' + (className ?? '')}>{children}</div>
}

export default Wraper
