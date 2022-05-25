import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import MenuContent from './MenuContent'

import './style.scss'

const ContextMenu = ({ children, icon, stayActiveOnClick = false }) => {
    const [menuStyles, setMenuStyles] = useState(null)

    const handleOpen = (event) => {
        if (menuStyles) return
        let x = event.clientX
        let y = event.clientY
        let transformOrigin = null

        if (y + 180 > window.screen.height) {
            y -= 100
            transformOrigin = 'bottom right'
        }

        setMenuStyles({
            transformOrigin,
            top: y,
            left: x,
        })
    }

    const closeMenu = () => setMenuStyles(false)

    return (
        <>
            <button
                className={'context-menu-btn' + (menuStyles ? ' active' : '')}
                onClick={handleOpen}
            >
                {icon ?? <FontAwesomeIcon icon={faEllipsisV} size="lg" />}
            </button>

            {menuStyles && (
                <MenuContent
                    menuStyles={menuStyles}
                    closeMenu={closeMenu}
                    stayActiveOnClick={stayActiveOnClick}
                >
                    {children}
                </MenuContent>
            )}
        </>
    )
}

export default ContextMenu
