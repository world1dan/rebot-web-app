import { useState, useMemo, createContext, useRef } from 'react'
import { css } from '@linaria/core'

import { ConfigContext } from './Context'

import useServiceWorker from './Hooks/useServiceWorker'
import TabBar from './Components/TabBar'
import HomeScreen from './Activities/HomeScreen'
import Week from './Activities/TimeTable/Week'
import Search from './Activities/Search'
import Marks from './Activities/Marks'
import { changeThemeColor } from './Utils/changeThemeColor'

const tabStyles = css`
    padding-bottom: calc(env(safe-area-inset-bottom) + 46px);
    height: 100%;

    transform-origin: top;

    transition-property: transform background-color;
    transition-duration: 0.4s;
    @media (max-width: 500px) {
        &.unfocused {
            @supports (-webkit-touch-callout: none) {
                border-radius: 14px;
                background-color: var(--bg2);
                transform: scale(0.92) translateY(8px);
            }
        }
    }
`

export const TabContext = createContext(null)

const Tab = ({ children, isActive, keepMounted, themeColor }) => {
    const [unfocused, setUnfocused] = useState(false)
    const tabRef = useRef(null)

    const unfocusTab = () => {
        setUnfocused(true)
    }

    const focusTab = () => {
        setUnfocused(false)
    }

    if (isActive) {
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

export default Tabs
