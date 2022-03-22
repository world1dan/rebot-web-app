import { useContext, useState, memo } from 'react'

import { ConfigContext } from '../../../Context'

import Time from './Time'
import Settings from 'Activities/Settings'
import Gear from '../../../Components/Icons/Gear'
import Rings from './Rings'
import SheetView from '../../../Components/SheetView'
import NewUpdateAlert from './NewUpdateAlert'

import './style.scss'

const Header = () => {
    const [settingsOpen, setSettingsOpen] = useState(false)
    const updateFounded = useContext(ConfigContext)?.updateFounded

    return (
        <>
            <header className="homescreen-header">
                <Rings />
                <Time />

                {updateFounded && <NewUpdateAlert />}

                <button onClick={() => setSettingsOpen(true)}>
                    <Gear width={38} height={24} />
                </button>
            </header>

            {settingsOpen && (
                <SheetView handleClose={() => setSettingsOpen(false)}>
                    <Settings />
                </SheetView>
            )}
        </>
    )
}

export default memo(Header)
