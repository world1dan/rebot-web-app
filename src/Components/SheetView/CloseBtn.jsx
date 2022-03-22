import { css } from '@linaria/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const styles = css`
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg4);
    border-radius: 50%;
    box-shadow: 0 0 0 1.5px var(--borders-soft) inset;
    color: var(--text2);
    height: 38px;
    width: 38px;
`

const CloseBtn = ({ onClick }) => {
    return (
        <button className={styles} onClick={onClick}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
    )
}

export default CloseBtn
