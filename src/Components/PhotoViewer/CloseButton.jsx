import { css } from '@linaria/core'

import Cross from '../Icons/Cross'

const styles = css`
    position: fixed;
    z-index: 1;
    right: 20px;
    top: 20px;
    background: var(--bg3);
    padding: 6px;
    border-radius: 50%;
    display: grid;
    place-items: center;
`
const CloseButton = ({ onClick }) => {
    return (
        <button className={styles} onClick={onClick}>
            <Cross width={36} height={36} />
        </button>
    )
}

export default CloseButton
