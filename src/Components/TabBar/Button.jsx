import { css } from '@linaria/core'
import { motion } from 'framer-motion'

const buttonStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--tab-bar-btn);
    transition: color 0.2s;

    &.active {
        color: var(--tab-bar-btn-active);
    }

    .caption {
        display: inline-block;
        font-size: 14px;
        font-weight: 600;

        @media (max-width: 600px) {
            display: none;
        }
    }
`

const Button = ({ handleClick, active, icon, title }) => {
    return (
        <motion.button
            onClick={handleClick}
            whileTap={{ scale: 0.92 }}
            className={buttonStyles + (active ? ' active' : '')}
        >
            {icon}
            <span className="caption">{title}</span>
        </motion.button>
    )
}

export default Button
