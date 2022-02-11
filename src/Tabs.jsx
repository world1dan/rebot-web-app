import { useState, useMemo, memo } from 'react'
import { css } from '@linaria/core'

import { ConfigContext } from './Context'

import TabBar from './Components/TabBar'
import HomeScreen from './Activities/HomeScreen'
import Week from './Activities/TimeTable/Week'
import Search from './Activities/Search'
import Marks from './Activities/Marks'
import { changeThemeColor } from './Utils/changeThemeColor'

const tabStyles = css`
    padding-bottom: calc(env(safe-area-inset-bottom) + 46px);
    height: 100%;
`

const Tab = ({ children, isActive, keepMounted, themeColor }) => {
    if (isActive) {
        changeThemeColor(themeColor)
    }

    return (
        (keepMounted || isActive) && (
            <div className={tabStyles} hidden={keepMounted && !isActive}>
                {children}
            </div>
        )
    )
}

const Tabs = ({ config, updateFounded }) => {
    const [activeTab, setActiveTab] = useState(1)
    const [statusBar, setStatusBar] = useState(false)

    const configContextValue = useMemo(() => {
        return {
            ...config,
            setStatusBar,
            updateFounded,
        }
    }, [config, updateFounded])

    return (
        <ConfigContext.Provider value={configContextValue}>
            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                statusBar={statusBar}
            />

            <Tab isActive={activeTab == 1} themeColor="var(--bg1)" keepMounted>
                <HomeScreen />
            </Tab>
            <Tab isActive={activeTab == 2} themeColor="var(--bg2)" keepMounted>
                <Search />
            </Tab>
            <Tab isActive={activeTab == 3} themeColor="var(--bg1)">
                <Marks />
            </Tab>
            <Tab isActive={activeTab == 5} themeColor="var(--bg2)">
                <Week />
            </Tab>
        </ConfigContext.Provider>
    )
}

export default memo(Tabs)
