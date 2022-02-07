import ContextMenu from '../../../Components/ContextMenu'

import './style.scss'

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
            <div className="rings-row" key={index}>
                <div className="index">{index + 1}</div>
                <div className="content">{time}</div>
            </div>
        )
    })

    return (
        <ContextMenu icon={<i className="fas fa-bell"></i>}>
            {lessons}
        </ContextMenu>
    )
}

/*
.rings-row {
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
}
*/
export default Rings
