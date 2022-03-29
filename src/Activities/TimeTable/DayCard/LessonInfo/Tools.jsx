import { useState } from 'react'
import { css } from '@linaria/core'

import { motion } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowUpFromBracket,
    faClone,
} from '@fortawesome/free-solid-svg-icons'

const styles = css`
    display: flex;
    gap: 10px;

    .btn {
        height: 38px;
        padding: 10px 18px;
        background: var(--bg4);
        font-size: 12px;
        border-radius: 5px;
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .share {
        background: var(--indigo);
        color: #fff;
    }
`

const Button = ({ onClick, className, children }) => {
    return (
        <motion.button
            className={'btn ' + (className ?? '')}
            onClick={onClick}
            whileTap={{
                scale: 0.94,
                filter: 'brightness(1.2)',
            }}
        >
            {children}
        </motion.button>
    )
}

const Tools = ({ homework }) => {
    const [isCopied, setIsCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(homework)
            setIsCopied(true)
        } catch {}
    }

    const share = () => {
        try {
            navigator.share({ title: homework })
        } catch {}
    }

    return (
        <div className={styles}>
            <Button onClick={copy}>
                <FontAwesomeIcon icon={faClone} />
                {isCopied ? 'Скопировано' : 'Скопировать'}
            </Button>
            <Button className="share" onClick={share}>
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                Поделиться
            </Button>
        </div>
    )
}

export default Tools
