import { css } from '@linaria/core'
import ContextMenu from '../../../Components/ContextMenu'
import Ring from '../../../Components/Icons/Ring'
const styles = css`
    align-items: center;
    background-color: var(--bg3);
    border-radius: 5px;
    display: grid;
    grid-template-columns: 28px 1fr;
    height: 34px;
    justify-content: center;
    text-align: center;
    width: 140px;

    .index {
        color: var(--text2);
        font-size: 16px;
        font-weight: bold;
    }

    .content {
        color: var(--text1);
        font-weight: 500;
    }
`

const menuStyles = css`
    .menu-items-wraper {
        transform: translateX(0) !important;
        .menu-items {
            transform-origin: left top !important;
        }
    }
`

const ringsTimetable = [
    '8.00 - 8.45',
    '8.55 - 9.40',
    '9.55 - 10.40',
    '10.55 - 11.40',
    '11.55 - 12.40',
    '12.50 - 13.35',
    '13.55 - 14.40',
]

const Rings = () => {
    const lessons = ringsTimetable.map((time, index) => {
        return (
            <div className={styles} key={index}>
                <div className="index">{index + 1}</div>
                <div className="content">{time}</div>
            </div>
        )
    })

    return (
        <div className={menuStyles}>
            <ContextMenu icon={<Ring width={22} height={22} />}>
                {lessons}
            </ContextMenu>
        </div>
    )
}

export default Rings
