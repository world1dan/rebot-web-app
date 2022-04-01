import { css } from '@linaria/core'
import { motion } from 'framer-motion'

const styles = css`
    background: var(--bg3);
    border-radius: 7px;
    display: flex;
    padding: 5px;
    overflow: hidden;
    transition: box-shadow 0.3s;

    &:focus-within {
        box-shadow: 0 0 0 2px var(--indigo);
        transition: box-shadow 0.2s;
    }

    .input {
        font-size: 16px;
        padding: 8px;
        font-weight: 600;
        flex-grow: 1;
    }

    .save-button {
        background: var(--indigo);
        padding: 8px 16px;
        border-radius: 5px;
        font-size: 13px;
        color: #fff;
        animation: 0.2s save-button-in;

        @keyframes save-button-in {
            from {
                transform: translateX(100%);
            }
            to {
                transform: none;
            }
        }
    }
`

const InputField = ({ value, onChange, onSave, showSaveButton }) => {
    return (
        <div className={styles}>
            <input className="input" value={value} onChange={onChange} />
            {showSaveButton && (
                <motion.button
                    className="save-button"
                    onClick={() => onSave(value)}
                    whileTap={{
                        scale: 0.94,
                        filter: 'brightness(1.3)',
                    }}
                >
                    Сохранить
                </motion.button>
            )}
        </div>
    )
}

export default InputField
