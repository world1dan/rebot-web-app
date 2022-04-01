import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@linaria/core'
import { motion } from 'framer-motion'
const styles = css`
    background: var(--bg3);
    box-sizing: border-box;
    height: calc(60px + env(safe-area-inset-bottom));

    padding-right: max(20px, env(safe-area-inset-right));
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: max(20px, env(safe-area-inset-left));
    padding-top: 12px;
    pointer-events: all;
    width: 100%;
    z-index: 1;

    display: flex;
    justify-content: flex-end;
`

const Tool = ({ onClick, children }) => {
    return (
        <motion.button className="tool" onClick={onClick}>
            {children}
        </motion.button>
    )
}

const ToolBar = ({ PhotoURL }) => {
    const sharePhoto = async () => {
        const response = await fetch(PhotoURL)
        const blob = await response.blob()
    }
    return (
        <div className={styles}>
            <Tool onClick={sharePhoto}>
                <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    size="xl"
                    color="var(--blue)"
                />
            </Tool>
        </div>
    )
}

export default ToolBar
