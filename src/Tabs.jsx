import { useState, useMemo, memo, useEffect } from 'react'
import { css } from '@linaria/core'

import { ConfigContext } from './Context'

import TabBar from './Components/TabBar'
import HomeScreen from './Activities/HomeScreen'
import Week from './Activities/TimeTable/Week'
import Search from './Activities/Search'
import Marks from './Activities/Marks'

const tabStyles = css`
    padding-bottom: calc(env(safe-area-inset-bottom) + 46px);
    height: 100%;
`

const Tab = ({ children, isActive, keepMounted, themeColorVar }) => {
    useEffect(() => {
        if (isActive) {
            const meta = document.querySelector('meta[name=theme-color]')
            meta.content = getComputedStyle(
                document.documentElement
            ).getPropertyValue(themeColorVar)
        }
    }, [isActive])

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

            <Tab isActive={activeTab == 1} themeColorVar="--bg1" keepMounted>
                <HomeScreen />
            </Tab>
            <Tab isActive={activeTab == 2} themeColorVar="--bg2" keepMounted>
                <Search />
            </Tab>
            <Tab isActive={activeTab == 3} themeColorVar="--bg1">
                <Marks />
            </Tab>
            <Tab isActive={activeTab == 5} themeColorVar="--bg2">
                <Week />
            </Tab>
        </ConfigContext.Provider>
    )
}

export default memo(Tabs)
