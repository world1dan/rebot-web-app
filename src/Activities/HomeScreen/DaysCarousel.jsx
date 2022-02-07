import { css } from '@linaria/core'
import React from 'react'

import DayCard from '../TimeTable/DayCard'

const styles = css`
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overflow-y: visible;
    white-space: nowrap;
    padding-bottom: 12px;
    vertical-align: middle;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--bg3);
        border-radius: 4px;
    }
    & > div {
        display: inline-block;
        width: inherit;
        scroll-snap-align: start;
        flex-grow: 1;
    }
`

const DaysCarousel = ({ timetable, dayNum, isWeekEnded }) => {
    const weekNum = isWeekEnded ? 3 : 2
    const currentWeek = timetable[weekNum]
    const currentWeekPath = weekNum + '.'

    return (
        <div className={styles}>
            {currentWeek[dayNum] && (
                <DayCard
                    dayNum={dayNum}
                    week={weekNum}
                    timetable={currentWeek[dayNum]}
                    pathToDay={currentWeekPath + dayNum}
                />
            )}
            {currentWeek[dayNum + 1] && (
                <DayCard
                    dayNum={dayNum + 1}
                    week={weekNum}
                    timetable={currentWeek[dayNum + 1]}
                    pathToDay={currentWeekPath + (dayNum + 1)}
                />
            )}
            {currentWeek[dayNum + 2] && (
                <DayCard
                    dayNum={dayNum + 2}
                    week={weekNum}
                    timetable={currentWeek[dayNum + 2]}
                    pathToDay={currentWeekPath + (dayNum + 2)}
                />
            )}
        </div>
    )
}

export default DaysCarousel
