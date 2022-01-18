import React, { memo } from 'react'


const Header = ({ week, prewWeek, nextWeek }) => {

    const title = week == 1 ? "Прошлая неделя" :
        week == 2 ? "Эта неделя" : "Следующая неделя"

    return (
        <header id="week-header">
            { week > 1 
                ?
                <button onClick={prewWeek}>
                    <i className="fas fa-chevron-left fa-2x"></i>
                </button>
                : 
                <button className="unactive">
                    <i className="fas fa-chevron-left fa-2x"></i>
                </button>
            }
            <span>{title}</span>
            { week < 3
                ?
                <button onClick={nextWeek}>
                    <i className="fas fa-chevron-right fa-2x"></i>
                </button>
                :
                <button className="unactive">
                    <i className="fas fa-chevron-right fa-2x"></i>
                </button>
            }
        </header>
    )
}

export default memo(Header)
