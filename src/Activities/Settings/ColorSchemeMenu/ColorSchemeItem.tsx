import { FC } from 'react'
import { css } from '@linaria/core'

import ActiveItemIndicator from './ActiveItemIndicator'

const styles = css`
    position: relative;
    height: 54px;
    width: 54px;
    border-radius: 50%;
    background: var(--bg4);
    transition: transform 0.2s ease-in-out;
`

export interface IColorSchemeItemProps {
    themeId: string
    isActive: boolean
    color: string
    onClick: () => void
}

const ColorSchemeItem: FC<IColorSchemeItemProps> = ({
    isActive,
    color,
    onClick,
}) => {
    return (
        <div
            className={styles}
            onClick={onClick}
            style={{
                background: color,
            }}
        >
            {isActive && <ActiveItemIndicator />}
        </div>
    )
}

export default ColorSchemeItem
