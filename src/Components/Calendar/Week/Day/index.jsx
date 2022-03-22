import { css } from '@linaria/core'
import { useContext } from 'react'
import { CalendarContext } from '../..'
import { MonthContext } from '../../Month'

const styles = css`
    background: var(--bg3);
    border-radius: 4px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    scroll-snap-align: center;
    overflow: hidden;

    &.today {
        border: 2px var(--indigo) solid;

        .minimized-day-caption {
            color: var(--text1);
        }
    }

    &.minimized {
        position: relative;
    }

    .minimized-day-caption {
        position: absolute;
        top: 2px;
        left: 4px;
        color: var(--text2);
        font-weight: 400;
        font-size: 9px;
    }

    &.weekend {
        color: var(--red);
        .minimized-day-caption {
            color: var(--red);
        }
    }

    .content {
        margin-left: auto;
        margin-right: 3px;
    }
`

const Day = ({ dayNum, isToday, isWeekend }) => {
    const generateContent =
        useContext(CalendarContext).customDayContentGenerator
    const month = useContext(MonthContext).month

    if (dayNum == -1) return <div></div>

    if (generateContent) {
        const content = generateContent(month, dayNum)
        return (
            <div
                className={
                    styles +
                    (isToday ? ' today' : '') +
                    (isWeekend ? ' weekend' : '') +
                    ' minimized'
                }
            >
                <div className="minimized-day-caption">{dayNum}</div>
                {content && <div className="content"> {content}</div>}
            </div>
        )
    }

    return (
        <div
            className={
                styles +
                (isToday ? ' today' : '') +
                (isWeekend ? ' weekend' : '')
            }
        >
            {dayNum}
        </div>
    )
}

export default Day
