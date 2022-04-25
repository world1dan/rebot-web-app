import { css } from '@linaria/core'
import { useState } from 'react'
import Calendar from '../../../../Components/Calendar'
import VerticalLayout from '../../../../Components/Layouts/VerticalLayout'
import SheetView from '../../../../Components/SheetView'
import H1 from '../../../../Components/Typography/H1'

import useInterval from '../../../../Hooks/useInterval'

const styles = css`
    text-align: center;
    display: flex;
    flex-direction: column;

    .date {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.5px;
    }
    .time {
        font-size: 12px;
        font-weight: 600;
        color: var(--text2);
        letter-spacing: -0.5px;
    }
`

const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}

const getParsedDate = (): string[] => {
    return new Date().toLocaleString('ru', options).split(',')
}

const DateTime = () => {
    const [date, setDate] = useState(getParsedDate)
    const [calendar, setCalendar] = useState<boolean>(false)

    useInterval(() => {
        setDate(getParsedDate)
    }, 1000)

    return (
        <>
            <div className={styles} onClick={() => setCalendar(true)}>
                <span className="date">{date[0]}</span>
                <span className="time">{date[1]}</span>
            </div>
            {calendar && (
                <SheetView handleClose={() => setCalendar(false)} type={{ wide: true }}>
                    <VerticalLayout noPadding={false}>
                        <H1 text="Календарь" />
                        <Calendar customDayContentGenerator={false} />
                    </VerticalLayout>
                </SheetView>
            )}
        </>
    )
}

export default DateTime
