import { css } from '@linaria/core'

import DayCard from '../TimeTable/DayCard'
import Card from '../../Components/Blocks/Card'
import Loading from '../../Components/Loading'

const styles = css`
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
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
        scroll-snap-align: start;
        scroll-snap-stop: always;
        display: inline-block;
        width: inherit;
    }
`

const Skeleton = () => {
    return (
        <Card title="">
            <Loading styles={{ height: 367 }} />
        </Card>
    )
}

const DaysCarousel = ({ timetable, dayNum, isWeekEnded }) => {
    if (!timetable) return <Skeleton />

    const weekNum = isWeekEnded ? 3 : 1 // удолить
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
