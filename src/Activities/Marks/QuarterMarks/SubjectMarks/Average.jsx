import { useState } from 'react'
import { css } from '@linaria/core'

import { getAverage } from 'Activities/Marks/utils'

import MarksCalculator from '../Calculator'
import SheetView from '../../../../Components/SheetView'

const styles = css`
    display: grid;
    gap: 4px;
    grid-template-rows: 1fr 32px;

    .average-mark,
    .mark-target {
        display: grid;
        place-items: center;
        background: var(--bg4);
        font-weight: bold;
        border-radius: 5px;
        box-shadow: 0 0 0 1.5px var(--lvl4-borders) inset;
        cursor: pointer;
    }

    .average-mark {
        font-size: 16px;

        @media (min-width: 500px) {
            font-size: 22px;
        }

        .no-mark {
            color: var(--text2);
            font-size: 18px;
        }
    }

    .mark-target {
        white-space: nowrap;
        color: var(--text2);
        font-size: 10px;

        @media (min-width: 500px) {
            font-size: 11px;
        }
    }
`
const Average = ({ marks, target, openTargetDialog, readOnly }) => {
    const [calculator, setCalculator] = useState(false)

    const average = getAverage(marks)
    const averageMarkStyles = {}

    if (average && Math.round(average) < parseInt(target)) {
        averageMarkStyles.border = 'var(--mark-yellow) 2px solid'
    }

    const averageToDisplay = average ? Number(average.toFixed(2)) : null

    const openCalculator = () => setCalculator(true)
    const closeCalculator = () => setCalculator(false)

    return (
        <div className={styles}>
            <div
                className="average-mark"
                onClick={openCalculator}
                style={averageMarkStyles}
            >
                {averageToDisplay || (
                    <i className="fa-solid fa-circle-question no-mark"></i>
                )}
            </div>
            <div
                className="mark-target"
                onClick={readOnly ? undefined : openTargetDialog}
            >
                Цель: {target}
            </div>

            {calculator && (
                <SheetView
                    handleClose={closeCalculator}
                    type="fullHeightOnMobile"
                >
                    <MarksCalculator initialMarks={marks} />
                </SheetView>
            )}
        </div>
    )
}

export default Average
