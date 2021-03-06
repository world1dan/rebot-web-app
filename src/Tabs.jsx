import { useState, useMemo, createContext, useRef } from 'react'
import { css } from '@linaria/core'

import { ConfigContext } from './Context'
import { changeThemeColor } from './Utils/changeThemeColor'

import HomeScreen from './Activities/HomeScreen'
import Marks from './Activities/Marks'
import Search from './Activities/Search'
import Week from './Activities/TimeTable/Week'
import TabBar from './Components/TabBar'
import useServiceWorker from './Hooks/useServiceWorker'
import getPlatform from './Utils/getPlatform'

const tabStyles = css`
    transform-origin: top;
    height: 100%;
    transition-property: transform, background-color, border-radius;
    transition-duration: 0.4s;
    background-color: var(--bg1);

    @media (max-width: 700px) {
        &.unfocused {
            overflow: hidden;
            border-radius: 16px 16px 0 0;
            background-color: var(--bg3);
            transform: scale(0.92) translateY(10px);
        }
    }
`

export const TabContext = createContext(null)

const Tab = ({ children, isActive, keepMounted, themeColor }) => {
    const [unfocused, setUnfocused] = useState(false)

    const tabRef = useRef(null)

    const unfocusTab = (themeColor) => {
        changeThemeColor(themeColor ?? 'var(--theme-color-when-unfocused)')
        document.body.classList.add('unfocused')
        setUnfocused(true)
    }

    const focusTab = () => {
        setUnfocused(false)
        document.body.classList.remove('unfocused')
    }

    if (isActive && !unfocused) {
        changeThemeColor(themeColor)
    }

    return (
        (keepMounted || isActive) && (
            <TabContext.Provider value={{ focusTab, unfocusTab }}>
                <div
                    className={tabStyles + (unfocused ? ' unfocused' : '')}
                    hidden={keepMounted && !isActive}
                    ref={tabRef}
                >
                    {children}
                </div>
            </TabContext.Provider>
        )
    )
}

const Tabs = ({ config }) => {
    const [activeTab, setActiveTab] = useState(1)
    const [statusBar, setStatusBar] = useState(false)

    const { updateFounded } = useServiceWorker(true, true)

    const configContextValue = useMemo(() => {
        return {
            ...config,
            setStatusBar,
            updateFounded,
            platform: getPlatform(),
        }
    }, [config, updateFounded])

    return (
        <ConfigContext.Provider value={configContextValue}>
            <TabBar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                statusBar={statusBar}
            />

            <Tab isActive={activeTab == 1} themeColor="var(--bg1)" keepMounted>
                <HomeScreen />
            </Tab>
            <Tab isActive={activeTab == 2} themeColor="var(--bg2)">
                <Search />
            </Tab>
            <Tab isActive={activeTab == 3} themeColor="var(--bg1)">
                <Marks />
            </Tab>
            <Tab isActive={activeTab == 4} themeColor="var(--bg2)">
                <Week />
            </Tab>
        </ConfigContext.Provider>
    )
}

export default Tabs
