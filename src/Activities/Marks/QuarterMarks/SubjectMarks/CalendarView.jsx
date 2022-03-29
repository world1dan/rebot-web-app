import { useState, useContext } from 'react'
import { css } from '@linaria/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

import { ConfigContext } from '../../../../Context'

import Calendar from '../../../../Components/Calendar'
import Mark from '../../Mark'
import SheetView from '../../../../Components/SheetView'
import ContextMenu from '../../../../Components/ContextMenu'
import VerticalLayout from '../../../../Components/Layouts/VerticalLayout'
import CalendarWithClocks from '../../../../Components/Icons/CalendarWithClocks'
import H1 from '../../../../Components/Typography/H1'

const buttonStyles = css`
    position: absolute;
    right: 8px;
    color: var(--text2);
    top: 0;
    padding: 4px;
`

const styles = css`
    .menu-items-wraper {
        transform: translateX(0);
        .menu-items {
            transform-origin: top left;
        }
    }
`

const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()

const isLessonInWeekDay = (weekDay, subject, group) => {
    if (subject.days.groups && subject.days[group]) {
        return subject.days[group].includes(weekDay)
    } else {
        return subject.days.includes(weekDay)
    }
}

const CalendarView = ({ marks, subject }) => {
    const group = useContext(ConfigContext).user.group

    const [isOpen, setIsOpen] = useState(false)

    const generator = (month, day) => {
        if (month >= 5 && month < 7) return {}

        const date = new Date(2022, month, day)
        const weekDay = date.getDay()

        const isLessonDay = isLessonInWeekDay(weekDay, subject, group)

        const marksAtThisDay = []

        marks.forEach((mark) => {
            if (datesAreOnSameDay(new Date(mark.time), date)) {
                marksAtThisDay.push(<Mark mark={mark} key={mark.time} />)
            }
        })

        return {
            content:
                marksAtThisDay.length > 1 ? (
                    <ContextMenu
                        stayActiveOnClick
                        icon={<FontAwesomeIcon icon={faLayerGroup} />}
                    >
                        {marksAtThisDay}
                    </ContextMenu>
                ) : (
                    marksAtThisDay
                ),
            shadowColor: isLessonDay ? subject.color : null,
        }
    }

    return (
        <>
            <button className={buttonStyles} onClick={() => setIsOpen(true)}>
                <CalendarWithClocks width={24} height={24} />
            </button>
            {isOpen && (
                <SheetView
                    handleClose={() => setIsOpen(false)}
                    background="var(--bg2)"
                    type={{ wide: true }}
                >
                    <VerticalLayout>
                        <div className={styles}>
                            <H1 text={subject.full_title || subject.title} />
                            <Calendar customDayContentGenerator={generator} />
                        </div>
                    </VerticalLayout>
                </SheetView>
            )}
        </>
    )
}

export default CalendarView
