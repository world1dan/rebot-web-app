import { css } from '@linaria/core'

import Cross from '../Icons/Cross'

const styles = css`
    position: absolute;
    right: 8px;
    top: 8px;

    color: var(--text2);
`

const CloseBtn = ({ onClick }) => {
    return (
        <button className={styles} onClick={onClick}>
            <Cross width={40} height={40} />
        </button>
    )
}

export default CloseBtn
