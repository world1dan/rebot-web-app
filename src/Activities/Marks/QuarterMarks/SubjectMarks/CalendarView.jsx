import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClockRotateLeft,
    faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'

import Calendar from '../../../../Components/Calendar'
import Mark from '../../Mark'
import SheetView from '../../../../Components/SheetView'
import ContextMenu from '../../../../Components/ContextMenu'

import { css } from '@linaria/core'
import VerticalLayout from '../../../../Components/Layouts/VerticalLayout'

const buttonStyles = css`
    position: absolute;
    right: 6px;
    color: var(--text2);
    top: 0;
    padding: 8px;
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

const CalendarView = ({ marks }) => {
    const [isOpen, setIsOpen] = useState(false)

    const generator = (month, day) => {
        const date = new Date(2022, month, day)

        const marksAtThisDay = []

        marks.forEach((mark) => {
            if (datesAreOnSameDay(new Date(mark.time), date)) {
                marksAtThisDay.push(<Mark mark={mark} />)
            }
        })

        if (marksAtThisDay.length > 1) {
            return (
                <ContextMenu
                    stayActiveOnClick
                    icon={<FontAwesomeIcon icon={faLayerGroup} />}
                >
                    {marksAtThisDay}
                </ContextMenu>
            )
        }
        return marksAtThisDay
    }

    return (
        <>
            <button className={buttonStyles} onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faClockRotateLeft} size="1x" />
            </button>
            {isOpen && (
                <SheetView
                    handleClose={() => setIsOpen(false)}
                    background="var(--bg1)"
                    type={{ fullHeightOnMobile: true }}
                >
                    <VerticalLayout>
                        <div className={styles}>
                            <Calendar customDayContentGenerator={generator} />
                        </div>
                    </VerticalLayout>
                </SheetView>
            )}
        </>
    )
}

export default CalendarView
