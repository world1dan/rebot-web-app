import React, { useState } from 'react'

import './style.scss'

const WhatsNew = () => {
    const [visible, setVisible] = useState(
        () => localStorage.whats_closed_v !== '3'
    )

    const handleClose = () => {
        setVisible(false)
        localStorage.whats_closed_v = '3'
    }

    return (
        visible && (
            <div className="WhatsNew">
                <h5 className="title">Что нового</h5>
                <ul className="change-log">
                    <li></li>
                </ul>
                <div className="close-btn" onClick={handleClose}>
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M5.9382 12.8104C5.67452 13.0741 5.66197 13.5449 5.94447 13.8149C6.21442 14.0974 6.69154 14.0849 6.95521 13.8211L10 10.7764L13.0448 13.8211C13.3147 14.0911 13.7793 14.0974 14.0492 13.8149C14.3318 13.5449 14.3255 13.0741 14.0555 12.8041L11.0107 9.75936L14.0555 6.72084C14.3255 6.44461 14.3318 5.98005 14.0492 5.7101C13.7793 5.42759 13.3147 5.43387 13.0448 5.70382L10 8.74857L6.95521 5.70382C6.69154 5.44015 6.21442 5.42759 5.94447 5.7101C5.66197 5.98005 5.67452 6.45089 5.9382 6.71456L8.983 9.75936L5.9382 12.8104Z" />
                    </svg>
                </div>
            </div>
        )
    )
}

export default WhatsNew
