import { useContext, useEffect, useRef } from 'react'

import { css } from '@linaria/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { ConfigContext } from '../../Context'

const statusBarStyles = css`
    position: fixed;
    right: 0;
    left: 0;
    bottom: calc(48px + env(safe-area-inset-bottom));

    z-index: 99;

    display: grid;
    grid-template-columns: 42px 1fr;
    align-items: center;
    height: 38px;

    padding-right: env(safe-area-inset-right);
    padding-left: env(safe-area-inset-left);
    padding-bottom: 2px;

    background-color: var(--bg2);
    border-top: 1px solid var(--borders);

    animation: Navigation-StatusBar-in 0.5s cubic-bezier(0.38, 0.7, 0.125, 1);
    touch-action: none;

    .icon {
        justify-self: center;
    }

    .sucsess {
        color: var(--green);
    }

    .error {
        color: var(--red);
    }

    .title {
        font-size: 14px;
        font-weight: 600;
    }

    @keyframes Navigation-StatusBar-in {
        from {
            transform: translateY(100%);
        }

        to {
            transform: translateY(0);
        }
    }
`

const StatusBar = ({ type, title }) => {
    const setStatusBar = useContext(ConfigContext).setStatusBar
    const ref = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            ref.current.animate(
                [
                    {
                        transform: 'translateY(0)',
                    },
                    {
                        transform: 'translateY(100%)',
                    },
                ],
                {
                    duration: 200,
                    fill: 'forwards',
                }
            ).onfinish = () => {
                setStatusBar(false)
            }
        }, 2200)
    }, [])

    return (
        <div className={statusBarStyles} ref={ref}>
            <div className="icon">
                {type === 'sucsess' && (
                    <FontAwesomeIcon icon={faCheckCircle} className="sucsess" />
                )}
                {type === 'error' && (
                    <FontAwesomeIcon icon={faTimesCircle} className="error" />
                )}
            </div>

            <div className="title">{title}</div>
        </div>
    )
}

export default StatusBar
