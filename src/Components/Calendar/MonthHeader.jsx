import { css } from '@linaria/core'

const styles = css`
    padding-bottom: 4px;
    color: var(--text2);
    max-width: 500px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;

    @media (min-width: 500px) {
        gap: 8px;
    }
    .column-caption {
        font-size: 14px;
        text-align: center;
    }
`

const columnsCaptions = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const MonthHeader = () => {
    return (
        <div className={styles}>
            {columnsCaptions.map((caption) => {
                return <div className="column-caption">{caption}</div>
            })}
        </div>
    )
}

export default MonthHeader
