import React, { useState } from 'react'

import VerticalLayout from '../../Components/Layouts/VerticalLayout'
import H1 from '../../Components/Typography/H1'
import Switch from '../../Components/Blocks/Switch'
import Radio from '../../Components/Blocks/SegmentedControl'
import Button from '../../Components/Blocks/Button'
import Updater from './Updater'

import './style.scss'

const Settings = () => {
    const [inversionState, setInversionState] = useState(
        () => localStorage.getItem('inversion') == 'true' ?? false
    )
    const [themeState, setThemeState] = useState(
        () => localStorage.getItem('theme') ?? 'dark'
    )

    const changeInversion = (state) => {
        setInversionState(state)
        if (!state) {
            document.documentElement.style.setProperty('--inv', 0)
        } else {
            document.documentElement.style.removeProperty('--inv')
        }
        localStorage.setItem('inversion', state)
    }

    const changeTheme = (theme) => {
        setThemeState(theme)
        document.documentElement.setAttribute('theme', theme)

        const meta = document.querySelector('meta[name=theme-color]')
        meta.content = getComputedStyle(
            document.documentElement
        ).getPropertyValue('--bg1')

        localStorage.setItem('theme', theme)
    }

    const logout = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <VerticalLayout>
            <H1 text="Настройки"></H1>
            <Radio
                activeItem={themeState}
                onChange={(id) => changeTheme(id)}
                items={[
                    { title: 'Темная', id: 'dark' },
                    { title: 'Светлая', id: 'light' },
                ]}
            />
            <Updater />
            <Switch
                title="Затемнять решения"
                descr="Светлый текст на темном фоне"
                icon={<i className="fas fa-moon"></i>}
                onChange={(e) => changeInversion(e.target.checked)}
                checked={inversionState}
            />

            <Button text="Выйти из аккаунта" onClick={logout} />
        </VerticalLayout>
    )
}

export default Settings
