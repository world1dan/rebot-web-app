import { useState } from 'react'
import Calendar from '../../../Components/Calendar'
import VerticalLayout from '../../../Components/Layouts/VerticalLayout'
import SheetView from '../../../Components/SheetView'
import H1 from '../../../Components/Typography/H1'

import useInterval from '../../../Hooks/useInterval'

const options = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}

const getParsedDate = () => {
    return new Date().toLocaleString('ru', options)
}

const Time = () => {
    const [date, setDate] = useState(getParsedDate)
    const [calendar, setCalendar] = useState(false)

    useInterval(() => {
        setDate(getParsedDate)
    }, 1000)

    return (
        <>
            <div className="time" onClick={() => setCalendar(true)}>
                {date}
            </div>
            {calendar && (
                <SheetView
                    handleClose={() => setCalendar(false)}
                    type={{ wide: true }}
                >
                    <VerticalLayout>
                        <H1 text="Календарь" />
                        <Calendar />
                    </VerticalLayout>
                </SheetView>
            )}
        </>
    )
}

export default Time
