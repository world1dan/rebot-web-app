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
        font-weight: 500;
        text-align: center;
    }
`

const monthTitleStyles = css`
    font-size: 20px;
    text-transform: capitalize;
    text-align: center;
    margin: 0;
    padding-top: 20px;
    margin-bottom: 10px;
`

const columnsCaptions = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const MonthHeader = ({ date }) => {
    const monthTitle = date.toLocaleString('ru', {
        month: 'long',
    })

    return (
        <>
            <h2 className={monthTitleStyles}>{monthTitle}</h2>
            <div className={styles}>
                {columnsCaptions.map((caption, i) => {
                    return (
                        <div className="column-caption" key={i}>
                            {caption}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default MonthHeader
