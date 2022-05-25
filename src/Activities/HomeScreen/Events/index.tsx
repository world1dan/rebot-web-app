import { memo } from 'react'
import { css } from '@linaria/core'

const styles = css`
    display: flex;
    gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 6px;

    ::-webkit-scrollbar {
        height: 5px;
        background-color: none;
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--bg2);
        border-radius: 5px;
    }

    .event {
        flex-grow: 1;
        justify-content: space-between;

        display: flex;
        flex-direction: column;
        gap: 10px;

        padding: 10px;
        border-radius: 9px;
        color: #fff;

        .event-name {
            font-size: 15px;
            font-weight: 600;
            white-space: pre-wrap;
        }

        .date {
            display: flex;
            flex-direction: column;

            gap: 8px;
        }

        .event-date {
            font-weight: 600;
            text-transform: capitalize;
            font-size: 14px;
        }

        .remaing-time {
            font-size: 12px;
        }
    }
`

const titleStyles = css`
    text-align: center;
    font-size: 13px;
    color: var(--text2);
    font-weight: 600;
`

function LightenDarkenColor(col, amt) {
    let usePound = false
    if (col[0] == '#') {
        col = col.slice(1)
        usePound = true
    }

    const num = parseInt(col, 16)

    let r = (num >> 16) + amt

    if (r > 255) r = 255
    else if (r < 0) r = 0

    let b = ((num >> 8) & 0x00ff) + amt

    if (b > 255) b = 255
    else if (b < 0) b = 0

    let g = (num & 0x0000ff) + amt

    if (g > 255) g = 255
    else if (g < 0) g = 0

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

interface IEvent {
    id: string
    title: string
    date: string
    color: string
}

const events: IEvent[] = [
    {
        id: 'rus-exam',
        title: 'Русский\nязык',
        date: '2022-06-02T09:00',
        color: '#5E5CE6',
    },
    {
        id: 'bel-exam',
        title: 'Белорусский\nязык',
        date: '2022-06-07T09:00',
        color: '#636DB4',
    },
    {
        id: 'math-exam',
        title: 'Математика',
        date: '2022-06-09T09:00',
        color: '#387ec3',
    },
]

const getRemainingTimeString = (date: string) => {
    const now = new Date()
    const eventDate = new Date(date)
    const diff = eventDate.getTime() - now.getTime()

    if (diff < 0) {
        return 'Событие прошло'
    }

    if (now.toDateString() == eventDate.toDateString()) {
        return 'Сегодня'
    }

    if (
        now.getDate() + 1 == eventDate.getDate() &&
        now.getMonth() == eventDate.getMonth()
    ) {
        return 'Завтра'
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    return `Через ${days} дней `
}

const Events = () => {
    return (
        <>
            <div className={titleStyles}>Экзамены</div>
            <div className={styles}>
                {events.map((event) => {
                    return (
                        <div
                            key={event.id}
                            className="event"
                            style={{
                                background: `linear-gradient(320deg, ${LightenDarkenColor(
                                    event.color,
                                    60
                                )} 0%, ${event.color} 100%)`,
                            }}
                        >
                            <div className="event-name">{event.title}</div>
                            <div className="date">
                                <span className="event-date">
                                    {new Date(event.date).toLocaleString('ru', {
                                        day: 'numeric',
                                        month: 'long',
                                        weekday: 'long',
                                    })}
                                </span>
                                <span className="remaing-time">
                                    {getRemainingTimeString(event.date)}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default memo(Events)
