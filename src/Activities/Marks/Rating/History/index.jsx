import { css } from '@linaria/core'
import { useEffect, useMemo, useRef, useState } from 'react'

import HistoryEvent from './HistoryEvent'

const styles = css`
    background-color: var(--bg2);
    border-radius: 9px;
    box-shadow: 0 0 0 1.5px var(--borders-soft) inset;

    @media (max-width: 360px) {
        border-radius: 0;
    }
`

const History = ({ usersRatings, usersInfo }) => {
    const [showAll, setShowAll] = useState(false)
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
        return list.sort((a, b) => b.time - a.time)
    }, [usersRatings, usersInfo])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setShowAll(true)
            }
        })
        observer.observe(dummy.current)
        return () => observer.disconnect()
    }, [])

    const historyEvents = showAll ? everyMark : everyMark.slice(0, 40)

    const historyElements = historyEvents.map((mark) => {
        return <HistoryEvent mark={mark} key={mark.time} />
    })

    return (
        <div className={styles}>
            {historyElements}
            <div ref={dummy}></div>
        </div>
    )
}

export default History
