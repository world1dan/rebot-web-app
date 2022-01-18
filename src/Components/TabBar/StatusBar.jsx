import React, { useContext, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { css } from "@linaria/core"

import { ConfigContext } from "../../Context"


const statusBarStyles = css`
    position: fixed;
    right: 0;
    bottom: calc(48px + var(--bottom-save-zone));
    left: 0;
    z-index: 99;
    display: grid;
    grid-template-columns: 42px 1fr;
    align-items: center;
    height: 38px;
    padding-right: env(safe-area-inset-right);
    padding-left: env(safe-area-inset-left);
    padding-bottom: 2px;
    color: var(--text1);
    background-color: var(--bg2);
    border-top: 1px solid var(--borders);
    animation: Navigation-StatusBar-in 0.5s cubic-bezier(0.38, 0.7, 0.125, 1);
    touch-action: none;

    .sucsess {
        color: #30af54ea;
        font-size: 14px;
        text-align: center;
    }

    .title {
        font-weight: 600;
        font-size: 14px;
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


const StatusBar = (props) => {
    const setStatusBar = useContext(ConfigContext).setStatusBar
    const ref = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            ref.current.animate([
                {
                    transform: "translateY(0)"
                },
                {
                    transform: "translateY(100%)"
                }
            ], {
                duration: 200,
                fill: "forwards"
            }).onfinish = () => {
                setStatusBar(false)
            }
        }, 2000)
    }, [])

    return (
        <div className={statusBarStyles} ref={ref}>
            {props.type === 'sucsess' && <i className="fas fa-check-circle sucsess"></i>}
            <div className="title">{props.title}</div>
        </div>
    )
}



StatusBar.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string.isRequired
}


export default StatusBar