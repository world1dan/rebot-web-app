import { useState } from 'react'
import Calendar from '../../../Components/Calendar'
import VerticalLayout from '../../../Components/Layouts/VerticalLayout'
import SheetView from '../../../Components/SheetView'
import H1 from '../../../Components/Typography/H1'

import useInterval from '../../../Hooks/useInterval'

const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}

const getParsedDate = (): string => {
    return new Date().toLocaleString('ru', options)
}

const Time = () => {
    const [date, setDate] = useState(getParsedDate)
    const [calendar, setCalendar] = useState<Boolean>(false)

    useInterval(() => {
        setDate(getParsedDate)
    }, 1000)

    return (
        <>
            <div className="time" onClick={() => setCalendar(true)}>
                {date}
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

export default Time
