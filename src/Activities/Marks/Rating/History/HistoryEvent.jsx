import { memo } from 'react'
import { css } from '@linaria/core'

import { useContext } from 'react'
import { manifestContext } from '../../../../Context'

import Mark from '../../Mark'

const styles = css`
    display: grid;
    grid-template-columns: 50px 10px 86px 1fr 80px;
    gap: 6px;
    align-items: center;
    justify-content: center;
    border-bottom: 3px solid var(--lvl4-borders);
    padding: 6px 8px;

    @media (max-width: 360px) {
        gap: 4px;
        padding: 6px 8px;
        grid-template-columns: 50px 10px 70px 1fr 80px;
    }
    .color-indicator {
        height: 32px;
        width: 5px;
        border-radius: 2px;
    }

    .username,
    .subject {
        font-size: 14px;
    }

    .date {
        font-size: 13px;
        letter-spacing: -0.5px;
        color: var(--text2);
        font-weight: 600;
    }

    &:last-of-type {
        border-bottom: 0;
    }
`

const dateFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
}

const HistoryEvent = ({ mark }) => {
    const subject = useContext(manifestContext)[mark.subjID]

    const date = new Date(mark.time).toLocaleString('ru-RU', dateFormatOptions)

    return (
        <div className={styles}>
            <Mark mark={mark} unclickable />
            <div
                className="color-indicator"
                style={{ background: subject.color }}
            />
            <div className="subject">{subject.title}</div>
            <div className="username">{mark.username}</div>
            <div className="date">{date}</div>
        </div>
    )
}

export default memo(HistoryEvent)
