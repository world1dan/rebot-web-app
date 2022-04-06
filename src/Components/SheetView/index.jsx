import { useRef, useState, useEffect, useContext } from 'react'
import { styled } from '@linaria/react'
import { AnimatePresence, motion } from 'framer-motion'

import ModalPortal from '../ModalPortal'
import Backdrop from '../Backdrop'
import CloseBtn from './CloseBtn'
import VScroll from '../VScroll'

import { TabContext } from '../../Tabs'

const Sheet = styled(motion.div)`
    position: fixed;
    right: 0;
    left: 0;

    bottom: 0;
    top: ${(p) => ('fullHeightOnMobile' in p.type ? 0 : '62px')};

    background: ${(p) => p.background ?? 'var(--bg2)'};

    z-index: 999;
    overflow: hidden;

    border: ${(p) =>
        'fullHeightOnMobile' in p.type ? 0 : 'var(--lvl4-borders) 2px solid;'};
    border-radius: ${(p) => ('fullHeightOnMobile' in p.type ? 0 : '13px 13px 0 0')};

    animation: adaptive-panel-in 440ms cubic-bezier(0.38, 0.7, 0.125, 1);

    @keyframes adaptive-panel-in {
        from {
            transform: translateY(calc(100vh - 80px));
        }

        to {
            transform: translateY(0);
        }
    }

    @media (min-width: 700px) {
        top: 28px;
        border-radius: 13px 13px 0 0;
        width: ${(p) =>
            !('wide' in p.type)
                ? 'clamp(550px, 70%, 700px)'
                : 'clamp(700px, 94%, 1000px)'};
        margin: 0 auto;
    }
`

const SheetView = ({ children, handleClose, type = {}, background }) => {
    const [isVisible, setIsVisible] = useState(true)
    const ref = useRef(null)

    const { focusTab, unfocusTab } = useContext(TabContext)

    const closeSheet = () => setIsVisible(false)

    useEffect(() => {
        if (!isVisible) {
            ref.current.animate([{ transform: 'translateY(100vh)' }], {
                duration: 220,
                easing: 'ease-in',
                fill: 'forwards',
            })

            focusTab()
        } else {
            unfocusTab(background ?? 'var(--bg2)')
        }
    }, [isVisible])

    return (
        <ModalPortal>
            <AnimatePresence onExitComplete={handleClose}>
                {isVisible && (
                    <Backdrop onClick={closeSheet}>
                        <Sheet ref={ref} type={type} background={background}>
                            <VScroll>{children}</VScroll>

                            <CloseBtn onClick={closeSheet} />
                        </Sheet>
                    </Backdrop>
                )}
            </AnimatePresence>
        </ModalPortal>
    )
}

export default SheetView
