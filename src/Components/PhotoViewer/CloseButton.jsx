import { css } from '@linaria/core'

import Cross from '../Icons/Cross'

const styles = css`
    position: fixed;
    z-index: 1;
    right: 10px;
    top: 10px;
    color: var(--text2);
    background: var(--bg3);
    align-items: center;
    justify-content: center;
    padding: 6px;
    padding-bottom: 2px;
    border-radius: 50%;
`
const CloseButton = ({ onClick }) => {
    return (
        <button className={styles} onClick={onClick}>
            <Cross width={42} height={42} />
        </button>
    )
}

export default CloseButton
