import { css } from '@linaria/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

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
    gap: 10px;
`

const AttachButton = ({ icon, attachedObjectInfo, onClick }) => {
    return (
        <button className={styles} onClick={onClick}>
            {attachedObjectInfo ? (
                <FontAwesomeIcon icon={faPen} />
            ) : (
                <PlusRounded width={18} height={18} />
            )}

            {attachedObjectInfo}
            {icon}
        </button>
    )
}

export default AttachButton
