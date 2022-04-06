import { css } from '@linaria/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

import PlusRounded from '../Icons/PlusRounded'

const styles = css`
    height: 40px;
    min-width: 70px;
    background-color: var(--bg4);
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 17px;
    max-width: 180px;
`

const AttachButton = ({ icon, isAlreadyAttached, onClick }) => {
    return (
        <motion.button
            className={styles}
            onClick={onClick}
            whileTap={{
                scale: 0.9,
                filter: 'brightness(1.2)',
            }}
        >
            {isAlreadyAttached ? (
                <FontAwesomeIcon icon={faPen} />
            ) : (
                <PlusRounded width={18} height={18} />
            )}
            {icon}
        </motion.button>
    )
}

export default AttachButton
