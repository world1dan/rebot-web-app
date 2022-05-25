import { useContext, useState, memo } from 'react'

import { ConfigContext } from '../../../Context'

import CurrentDay from './CurrentDay'
import Settings from '../../Settings'
import Gear from '../../../Components/Icons/Gear'
import Rings from './Rings'
import NewUpdateAlert from './NewUpdateAlert'

import './style.scss'

const Header = () => {
    const [settingsOpen, setSettingsOpen] = useState(false)
    const updateFounded = useContext(ConfigContext)?.updateFounded

    return (
        <>
            <header className="homescreen-header">
                <Rings />
                <CurrentDay />

                {updateFounded && <NewUpdateAlert />}

                <button onClick={() => setSettingsOpen(true)}>
                    <Gear width={38} height={24} />
                </button>
            </header>

            {settingsOpen && (
                <Settings handleClose={() => setSettingsOpen(false)} />
            )}
        </>
    )
}

export default memo(Header)
