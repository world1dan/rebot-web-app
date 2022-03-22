import { css } from '@linaria/core'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { motion } from 'framer-motion'

const styles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;

    .caption {
        font-size: 14px;
        font-weight: 600;
    }
`

const CloseButton = ({ handleClick }) => {
    return (
        <motion.button
            initial={{ scale: 0.7, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: 0.3,
            }}
            className={styles}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faChevronUp} size="2x" />
            <div className="caption">Закрыть</div>
        </motion.button>
    )
}

export default CloseButton
