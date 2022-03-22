import { css } from '@linaria/core'
import { motion } from 'framer-motion'
import { memo } from 'react'

const styles = css`
    align-items: center;
    display: grid;
    gap: 7px;
    grid-template-columns: 1fr 1fr 1fr;

    button {
        align-items: center;
        background: var(--bg4);
        border-radius: 7px;
        display: flex;
        font-size: 13px;
        height: 44px;
        justify-content: center;
    }

    .save-btn {
        background-color: var(--indigo);
        color: #fff;
    }
`

const ActionButton = ({ onClick, className, children }) => {
    return (
        <motion.button
            onClick={onClick}
            className={className}
            whileTap={{
                scale: 0.91,
                filter: 'brightness(1.1)',
            }}
        >
            {children}
        </motion.button>
    )
}

const Actions = ({ clear, closeModal, save }) => {
    return (
        <div className={styles}>
            <ActionButton onClick={clear}>Очистить</ActionButton>
            <ActionButton onClick={closeModal}>Отмена</ActionButton>
            <ActionButton onClick={save} className="save-btn">
                Сохранить
            </ActionButton>
        </div>
    )
}

export default memo(Actions)
