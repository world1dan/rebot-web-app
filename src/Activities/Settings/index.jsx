import { useState } from 'react'

import { clearIndexedDbPersistence, terminate } from 'firebase/firestore'
import { firestore } from '../../Context'

import VerticalLayout from '../../Components/Layouts/VerticalLayout'

import Radio from '../../Components/Blocks/SegmentedControl'
import Switch from '../../Components/Switch'
import ActionBtn from './ActionBtn'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faBroom,
} from '@fortawesome/free-solid-svg-icons'

import { css } from '@linaria/core'

import SheetView from '../../Components/SheetView'
import Profile from './Profile/index.jsx'
import Cell from '../../Components/Cell'

import ColorSchemeMenu from './ColorSchemeMenu'

const buttonGroupStyles = css`
    display: grid;
    gap: 14px;
    grid-template-columns: 1fr 1fr;
`

const Settings = ({ handleClose }) => {
    const [inversionState, setInversionState] = useState(
        () => localStorage.getItem('inversion') == 'true' ?? false
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
        <SheetView
            handleClose={handleClose}
            type={{ fullHeightOnMobile: true }}
        >
            <SheetView.Title>Настройки</SheetView.Title>
            <VerticalLayout>
                <Profile />

                <ColorSchemeMenu />
                <Cell
                    after={
                        <Switch
                            onChange={(e) => changeInversion(e.target.checked)}
                            checked={inversionState}
                        />
                    }
                >
                    Темная тема для решений
                </Cell>

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
        </SheetView>
    )
}

export default Settings
