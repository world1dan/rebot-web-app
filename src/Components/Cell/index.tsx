import { css } from '@linaria/core'
import { FC, ReactNode } from 'react'

const styles = css`
    display: flex;
    align-items: center;
    position: relative;
    font-size: 15px;

    .child-content {
        flex-grow: 1;
        text-overflow: ellipsis;
    }

    padding: 3px 12px;
    gap: 10px;
`
export interface ICellProps {
    before?: ReactNode
    after?: ReactNode
    children: ReactNode
}

const Cell: FC<ICellProps> = ({ children, before, after }) => {
    return (
        <div className={styles}>
            {before}
            <div className="child-content">{children}</div>

            {after}
        </div>
    )
}

export default Cell
