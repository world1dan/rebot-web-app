import { useContext, useState, memo } from 'react'
import { css } from '@linaria/core'

import { ConfigContext } from '../../../Context'

import Time from './Time'
import Settings from 'Activities/Settings'
import Gear from '../../../Components/Icons/Gear'
import SquareRoot from '../../../Components/Icons/SquareRoot'
import ContextMenu from '../../../Components/ContextMenu'
import ContextMenuBtn from '../../../Components/ContextMenu/ContextMenuBtn'
import DownloadSquare from '../../../Components/Icons/DownloadSquare'
import Tools from '../../../Screens/Tools'
import SheetView from '../../../Components/SheetView'

import './style.scss'

const updateIconStyles = css`
    &::after {
        position: absolute;
        top: -6px;
        right: -4px;
        background: var(--green);
        width: 6px;
        height: 6px;
        content: '';
        border-radius: 50%;
    }
`

const updateMenuStyles = css`
    padding: 10px;
    font-size: 15px;
`

const Header = () => {
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [toolsOpen, setToolsOpen] = useState(false)
    const updateFounded = useContext(ConfigContext)?.updateFounded

    return (
        <>
            <header className="homescreen-header">
                <button onClick={() => setToolsOpen(true)}>
                    <SquareRoot width={24} height={24} />
                </button>
                <Time />

                {updateFounded && (
                    <ContextMenu
                        icon={
                            <button className={updateIconStyles}>
                                <DownloadSquare width={21} height={21} />
                            </button>
                        }
                    >
                        <div className={updateMenuStyles}>
                            Найдено обновление
                        </div>
                        <ContextMenuBtn
                            title="Обновить"
                            onClick={() => document.location.reload()}
                        />
                    </ContextMenu>
                )}

                <button onClick={() => setSettingsOpen(true)}>
                    <Gear width={23} height={23} />
                </button>
            </header>

            {settingsOpen && (
                <SheetView handleClose={() => setSettingsOpen(false)}>
                    <Settings />
                </SheetView>
            )}
            {toolsOpen && <Tools handleClose={() => setToolsOpen(false)} />}
        </>
    )
}

export default memo(Header)
