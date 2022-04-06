import { css } from '@linaria/core'
import { motion } from 'framer-motion'

const styles = css`
    font-size: 14px;
    gap: 10px;
    display: flex;
    align-items: center;
    background: var(--bg4);
    border-radius: 7px;

    height: 46px;
    padding: 0 16px;

    .text {
        text-align: center;
        width: 100%;
    }
`

const ToolButton = ({ onClick, text, icon }) => {
    return (
        <motion.button
            className={styles}
            onClick={onClick}
            whileTap={{
                scale: 0.94,
                filter: 'brightness(1.3)',
            }}
        >
            {icon}
            <div className="text">{text}</div>
        </motion.button>
    )
}

export default ToolButton
