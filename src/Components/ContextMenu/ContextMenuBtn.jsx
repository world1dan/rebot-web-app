import { css } from '@linaria/core'

const styles = css`
    background: var(--bg4);
    border-radius: 7px;
    display: grid;
    gap: 2px;
    grid-template-columns: 35px 1fr;
    height: 42px;
    padding: 4px;
    place-items: center;
    min-width: 164px;

    span {
        font-size: 14px;
        font-weight: 600;
        padding: 6px;
        text-align: left;
        width: 100%;
    }

    &:hover {
        filter: brightness(1.35);
        transition: filter 240ms;
    }
`
const ContextMenuBtn = ({ onClick, title, icon }) => {
    return (
        <button className={styles} onClick={onClick}>
            {icon}
            <span>{title}</span>
        </button>
    )
}

export default ContextMenuBtn
