import { css } from '@linaria/core'

const styles = css`
    align-items: center;
    background-color: var(--bg3);
    border-radius: 9px;
    display: flex;
    font-size: 13px;
    min-height: 42px;
    padding: 6px;

    .icon {
        display: grid;
        place-items: center;
        background: var(--blue);
        height: 34px;
        width: 34px;
        border-radius: 7px;
        flex-shrink: 0;
        color: #fff;
    }
    .text {
        text-align: center;
        flex-grow: 1;
        padding-right: 10px;
    }
`

const ActionBtn = ({ icon, text, onClick, iconBgColor }) => {
    return (
        <button className={styles} onClick={onClick}>
            {icon && (
                <div className="icon" style={{ backgroundColor: iconBgColor }}>
                    {icon}
                </div>
            )}
            <div className="text"> {text}</div>
        </button>
    )
}

export default ActionBtn
