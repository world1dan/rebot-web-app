import { useState } from 'react'

import { clearIndexedDbPersistence, terminate } from 'firebase/firestore'
import { firestore } from '../../Context'

import VerticalLayout from '../../Components/Layouts/VerticalLayout'
import H1 from '../../Components/Typography/H1'
import Switch from '../../Components/Blocks/Switch'
import Radio from '../../Components/Blocks/SegmentedControl'
import Updater from './Updater'
import ActionBtn from './ActionBtn'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faBroom,
    faCircleHalfStroke,
} from '@fortawesome/free-solid-svg-icons'
import { css } from '@linaria/core'
import { setCorrectColorScheme } from '../../ColorScheme'

const buttonGroupStyles = css`
    display: grid;
    gap: 14px;
    grid-template-columns: 1fr 1fr;
`

const themeTitleStyles = css`
    color: var(--text2);
    font-size: 15px;
    padding-left: 20px;
    font-weight: 600;
`
const Settings = () => {
    const [inversionState, setInversionState] = useState(
        () => localStorage.getItem('inversion') == 'true' ?? false
    )
    const [themeState, setThemeState] = useState(
        () => localStorage.getItem('theme') ?? 'auto'
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

        localStorage.setItem('theme', theme)
        setCorrectColorScheme()
    }

    const logout = async () => {
        localStorage.removeItem('user')
        await terminate(firestore)
        await clearIndexedDbPersistence(firestore)
        window.location.reload()
    }

    const clearPersistence = async () => {
        await terminate(firestore)
        await clearIndexedDbPersistence(firestore)
        location.reload()
    }

    return (
        <VerticalLayout>
            <H1 text="Настройки"></H1>
            <div className={themeTitleStyles}>Тема интерфейса</div>
            <Radio
                activeItem={themeState}
                onChange={(id) => changeTheme(id)}
                items={[
                    { title: 'Авто', id: 'auto' },
                    { title: 'Темная', id: 'dark' },
                    { title: 'Светлая', id: 'light' },
                ]}
            />
            <Updater />
            <Switch
                title="Затемнять решения"
                descr="Светлый текст на темном фоне"
                icon={<FontAwesomeIcon icon={faCircleHalfStroke} />}
                onChange={(e) => changeInversion(e.target.checked)}
                checked={inversionState}
            />
            <div className={buttonGroupStyles}>
                <ActionBtn
                    text="Выйти"
                    onClick={logout}
                    icon={
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            size="lg"
                        />
                    }
                    iconBgColor="var(--red)"
                />
                <ActionBtn
                    text="Очистить кэш"
                    onClick={clearPersistence}
                    icon={<FontAwesomeIcon icon={faBroom} />}
                />
            </div>
        </VerticalLayout>
    )
}

export default Settings
