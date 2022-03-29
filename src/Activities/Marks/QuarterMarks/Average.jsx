import { css } from '@linaria/core'
import { analyzeQuarterMarks } from '../utils'

const averageStyles = css`
    box-shadow: 0px 0px 0px 1.5px var(--borders-soft) inset;
    background: var(--bg2);
    border-radius: 7px;
    padding: 5px;
    display: grid;
    grid-template-columns: 1fr 100px;
    gap: 5px;

    @media (min-width: 750px) {
        width: calc(50% - 6px);
        margin-top: 10px;
    }

    margin-top: 8px;

    @media (min-width: 500px) {
        grid-template-columns: 1fr 130px;
        border-radius: 7px;
        padding: 7px;
    }

    .title {
        font-size: 18px;
        font-weight: 600;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 15px;
    }

    .sub-title {
        color: var(--text2);
        font-size: 14px;
        font-weight: 600;
    }

    .average {
        display: grid;
        gap: 4px;
        grid-template-rows: 46px 34px;

        .average-mark,
        .target {
            font-weight: bold;
            background: var(--bg4);
            border-radius: 5px;
            box-shadow: 0px 0px 0px 1.5px var(--lvl4 - borders) inset;
            display: grid;
            place-items: center;
        }

        .average-mark {
            font-size: 20px;
        }

        .target {
            color: var(--text2);
            font-size: 12px;
        }
    }
`

const Average = ({ marks }) => {
    const analyzed = analyzeQuarterMarks(marks)

    const styles = {}

    if (
        analyzed.averageOfQuarter &&
        analyzed.targetOfQuarter &&
        analyzed.averageOfQuarter < analyzed.targetOfQuarter
    ) {
        styles.border = 'var(--yellow) 1.5px solid'
    }

    return (
        <div className={averageStyles}>
            <div className="info">
                <span className="title">Средний балл</span>
                <span className="sub-title">4 Четверть</span>
            </div>

            <div className="average">
                <div className="average-mark" style={styles}>
                    {analyzed.averageOfQuarter?.toFixed(2)}
                </div>
                <div className="target">
                    Цель: {analyzed.targetOfQuarter?.toFixed(2)}
                </div>
            </div>
        </div>
    )
}

export default Average
