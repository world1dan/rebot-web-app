import { css } from '@linaria/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import Header from './Header'

import HistoryEvent from './HistoryEvent'
import { sortMarks } from './utils'

const styles = css`
    background-color: var(--bg2);
    border-radius: 9px;
    box-shadow: 0 0 0 1.5px var(--borders-soft) inset;
`

const History = ({ usersRatings, usersInfo }) => {
    const [showAll, setShowAll] = useState(false)
    const [sortingType, setSortingType] = useState('date-recent')
    const dummy = useRef(null)

    const everyMark = useMemo(() => {
        const list = []
        usersRatings.forEach((u) => {
            for (let subjID in u.marks) {
                if (subjID == 'marksTargets') continue
                u.marks[subjID].forEach((subjectMark) => {
                    list.push({
                        ...subjectMark,
                        username: usersInfo?.[u.userUUID]?.first_name,
                        subjID: subjID,
                    })
                })
            }
        })
        return sortMarks(sortingType, list)
    }, [usersRatings, usersInfo, sortingType])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setShowAll(true)
            }
        })
        observer.observe(dummy.current)
        return () => observer.disconnect()
    }, [])

    const historyEvents = showAll ? everyMark : everyMark.slice(0, 20)

    const historyElements = historyEvents.map((mark) => {
        return (
            <HistoryEvent
                mark={mark}
                key={mark.time + mark.mark + mark.username}
            />
        )
    })

    return (
        <div className={styles}>
            <Header setSortingType={setSortingType} />
            {historyElements}
            <div ref={dummy}></div>
        </div>
    )
}

export default History
