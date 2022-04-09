import { css } from '@linaria/core'

const styles = css`
    display: grid;
    gap: 2px;
    grid-template-columns: 35px 1fr;
    height: 46px;
    box-shadow: 0 1.5px 0 0 var(--borders);
    &:last-of-type {
        box-shadow: none;
    }
    padding: 6px;
    place-items: center;
    min-width: 174px;

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
