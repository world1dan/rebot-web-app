import { css } from '@linaria/core'
import Day from './Day'

const styles = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    max-width: 500px;
    gap: 6px;

    @media (min-width: 500px) {
        gap: 8px;
    }
`

const Week = ({ days, isCurrentMonth }) => {
    return (
        <div className={styles}>
            {days.map((dayNum, i) => {
                if (isCurrentMonth) {
                    const currentDayNum = new Date().getDate()

                    if (dayNum == currentDayNum) {
                        return <Day dayNum={dayNum} isToday key={i} />
                    }
                }

                return (
                    <Day dayNum={dayNum} key={i} isWeekend={i == 5 || i == 6} />
                )
            })}
        </div>
    )
}

export default Week
