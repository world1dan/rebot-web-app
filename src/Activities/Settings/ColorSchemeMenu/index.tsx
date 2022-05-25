import { useState } from 'react'
import { css } from '@linaria/core'

import { changeThemeColor } from '../../../Utils/changeThemeColor'
import { setCorrectColorScheme } from '../../../ColorScheme'

import ColorSchemeItem from './ColorSchemeItem'

type ColorScheme = {
    name: string
    themeId: string
    color: string
}

const colorSchemes: ColorScheme[] = [
    {
        name: 'Авто',
        themeId: 'auto',
        color: 'linear-gradient(-45deg, #212122 50%, #e1e3e6 50%)',
    },
    { name: 'Темная', themeId: 'dark', color: '#212122' },
    { name: 'Светлая', themeId: 'light', color: '#e1e3e6' },
    { name: 'Зеленая', themeId: 'green', color: '#264d4a' },
    { name: 'Синяя', themeId: 'blue', color: '#2b2c3e' },
    { name: 'Песочная', themeId: 'sand', color: '#f5f2eb' },
]

const styles = css`
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(10, 54px);
    gap: 8px;
    overflow: auto;
`

const ColorSchemeMenu = () => {
    const [activeThemeId, setActiveThemeId] = useState(
        localStorage.theme ?? 'auto'
    )

    const changeColorScheme = (themeId: string) => {
        setActiveThemeId(themeId)
        localStorage.setItem('theme', themeId)
        setCorrectColorScheme()
        changeThemeColor('#000')
    }

    return (
        <div className={styles}>
            {colorSchemes.map(({ themeId, color }) => {
                return (
                    <ColorSchemeItem
                        key={themeId}
                        color={color}
                        themeId={themeId}
                        isActive={activeThemeId === themeId}
                        onClick={() => changeColorScheme(themeId)}
                    />
                )
            })}
        </div>
    )
}

export default ColorSchemeMenu
