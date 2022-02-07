import { useCallback, useRef } from 'react'
import useEventListener from '../../Hooks/useEventListener'

const MenuContent = ({ menuStyles, children, closeMenu }) => {
    const menu = useRef()

    const handleClose = useCallback((event) => {
        if (menu.current) {
            try {
                if (
                    (event.type === 'pointerdown' || event.type === 'wheel') &&
                    event.composedPath().includes(menu.current)
                ) {
                    return
                }
            } catch (e) {
                alert(e.message)
            }

            menu.current.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 120,
                fill: 'both',
            }).onfinish = closeMenu
        }
    }, [])

    useEventListener('pointerdown', handleClose, window, {
        once: true,
    })

    useEventListener('wheel', handleClose, window, {
        once: true,
        capture: true,
    })

    return (
        <div className="menu-items-wraper" style={menuStyles}>
            <div
                className="menu-items"
                ref={menu}
                style={menuStyles}
                onClick={handleClose}
            >
                {children}
            </div>
        </div>
    )
}

export default MenuContent
