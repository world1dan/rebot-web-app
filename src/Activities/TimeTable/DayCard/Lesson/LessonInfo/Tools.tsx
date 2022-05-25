import { useState } from 'react'
import { css } from '@linaria/core'

import { motion } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faClone } from '@fortawesome/free-solid-svg-icons'

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

interface IButtonProps {
    onClick: () => void
    children: React.ReactNode
    className?: string
}

const Button = ({ onClick, className, children }: IButtonProps) => {
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

export interface IToolsProps {
    homework: string
}

const Tools = ({ homework }: IToolsProps) => {
    const [isCopied, setIsCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(homework)
            setIsCopied(true)
        } catch {
            alert('Не удалось скопировать ссылку')
        }
    }

    const share = () => {
        try {
            navigator.share({ title: homework })
        } catch {
            alert('Не удалось поделиться ссылкой')
        }
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
