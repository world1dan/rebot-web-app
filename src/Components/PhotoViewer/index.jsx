import { useState, useRef } from 'react'
import { css } from '@linaria/core'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import ModalPortal from '../ModalPortal'
import Loading from '../Loading'
import CloseButton from './CloseButton'
import ToolBar from './ToolBar'

const styles = css`
    position: fixed;
    height: 100vh;

    @supports (height: 100svh) {
        height: 100svh;
    }

    backdrop-filter: blur(8px) brightness(calc(var(--reduced-brightness) - 0.2));
    -webkit-backdrop-filter: blur(8px) brightness(calc(var(--reduced-brightness) - 0.2));
    display: grid;
    place-items: center;
    z-index: 999;
    width: 100vw;

    @keyframes enter {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes exit {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.94);
        }
    }

    animation: 0.2s enter;

    &.exit {
        animation: 0.15s exit forwards;
    }

    .image {
        min-height: 100px;
        max-height: 100vh;
        object-fit: contain;
        width: 100%;

        @supports (max-height: 100svh) {
            max-height: 100svh;
        }
    }

    .container {
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
    }
`

const PhotoViewer = ({ URL, handleClose, handleRemove, children }) => {
    const [show, setShow] = useState(false)
    const modal = useRef(null)

    const closeModal = () => {
        modal.current.classList.add('exit')

        modal.current.addEventListener('animationend', handleClose, { once: true })
    }

    return (
        <ModalPortal>
            <TransformWrapper maxScale={4}>
                <div className={styles} ref={modal}>
                    <CloseButton onClick={closeModal} />
                    <TransformComponent
                        wrapperStyle={{
                            overflow: 'visible',
                        }}
                    >
                        {children ?? (
                            <img
                                onLoadedData={() => setShow(true)}
                                onLoad={() => setShow(true)}
                                className="image"
                                src={URL}
                                style={{ display: !show ? 'none' : '' }}
                            />
                        )}
                        {!show && !children && (
                            <div className="container">
                                <Loading
                                    styles={{
                                        height: '100px',
                                        width: '100px',
                                    }}
                                />
                            </div>
                        )}
                    </TransformComponent>
                    <ToolBar PhotoURL={URL} handleRemove={handleRemove} />
                </div>
            </TransformWrapper>
        </ModalPortal>
    )
}

export default PhotoViewer
