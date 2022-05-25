import { useRef, useState, useEffect, useContext } from 'react'
import { styled } from '@linaria/react'
import { AnimatePresence, motion } from 'framer-motion'

import { RemoveScroll } from 'react-remove-scroll'
import ModalPortal from '../ModalPortal'
import Backdrop from '../Backdrop'
import CloseBtn from './CloseBtn'

import { TabContext } from '../../Tabs'
import { PanHandler } from 'framer-motion/types/gestures/PanSession'
import Title from './Title'
const Sheet = styled(motion.div)`
    position: fixed;
    right: 0;
    left: 0;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0px;
        display: none;
    }
    bottom: 0;
    top: ${(p) => ('fullHeightOnMobile' in p.type ? '24px' : '62px')};

    background: ${(p) => p.background ?? 'var(--bg2)'};
    padding-bottom: max(env(safe-area-inset-bottom), 14px);
    z-index: 999;

    border: ${(p) =>
        'fullHeightOnMobile' in p.type ? 0 : 'var(--lvl4-borders) 2px solid;'};
    border-radius: 13px 13px 0 0;

    animation: adaptive-panel-in 440ms cubic-bezier(0.38, 0.7, 0.125, 1) both;

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

export interface ISheetViewProps {
    type?: object
    background?: string
    children: React.ReactNode
    handleClose: () => void
}

const SheetView = ({
    children,
    handleClose,
    type = {},
    background,
}: ISheetViewProps) => {
    const [isVisible, setIsVisible] = useState(true)
    const ref = useRef<HTMLDivElement>(null)

    const { focusTab, unfocusTab } = useContext(TabContext)

    const closeSheet = () => setIsVisible(false)

    useEffect(() => {
        if (!isVisible) {
            ref.current.animate([{ transform: 'translateY(100vh)' }], {
                duration: 220,
                easing: 'ease-in',
                fill: 'both',
            })

            focusTab()
        } else {
            unfocusTab()
        }
    }, [isVisible])

    const onPanStart: PanHandler = () => {
        if (ref.current)
            ref.current.getAnimations().map((animation) => animation.finish())
    }

    const onPanEnd: PanHandler = (_, info) => {
        if (info.velocity.y >= 500) {
            closeSheet()
        } else {
            if (ref.current) {
                ref.current
                    .getAnimations()
                    .map((animation) => animation.finish())
                ref.current.animate(
                    [
                        {
                            transform: 'translateY(0)',
                        },
                    ],
                    {
                        duration: 500,
                        easing: 'cubic-bezier(0.38, 0.7, 0.125, 1)',
                        fill: 'both',
                    }
                )
            }
        }
    }

    const onPan: PanHandler = (_, info) => {
        if (!ref.current) return

        if (ref.current.scrollTop == 0 && info.offset.y >= 0) {
            ref.current.animate(
                [
                    {
                        transform: 'translateY(' + info.offset.y + 'px)',
                    },
                ],
                {
                    duration: 20,
                    fill: 'both',
                }
            )
        }
    }

    return (
        <ModalPortal>
            <AnimatePresence onExitComplete={handleClose}>
                {isVisible && (
                    <Backdrop onClick={closeSheet}>
                        <RemoveScroll>
                            <Sheet
                                ref={ref}
                                type={type}
                                background={background}
                                onPan={onPan}
                                onPanStart={onPanStart}
                                onPanEnd={onPanEnd}
                            >
                                {children}

                                <CloseBtn onClick={closeSheet} />
                            </Sheet>
                        </RemoveScroll>
                    </Backdrop>
                )}
            </AnimatePresence>
        </ModalPortal>
    )
}

SheetView.Title = Title

export default SheetView
