import { useState } from 'react'
import { css } from '@linaria/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

import { getAverage } from '../../utils'

import MarksCalculator from '../Calculator'
import SheetView from '../../../../Components/SheetView'
import AnimatedNum from '../../AnimatedNum'

const styles = css`
    display: grid;
    gap: 4px;
    grid-template-rows: 1fr 32px;

    .gpa,
    .gpa-target {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--bg4);
        font-weight: bold;
        border-radius: 5px;
        box-shadow: 0 0 0 1.5px var(--lvl4-borders) inset;
    }

    .gpa {
        position: relative;
        overflow: hidden;
        font-size: 18px;

        @media (min-width: 500px) {
            font-size: 22px;
        }

        .no-gpa {
            color: var(--text2);
        }
    }

    .gpa-target {
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
        averageMarkStyles.border = 'var(--yellow) 1.5px solid'
    }

    const averageToDisplay = average ? Number(average.toFixed(2)) : null

    const openCalculator = () => setCalculator(true)
    const closeCalculator = () => setCalculator(false)

    return (
        <div className={styles}>
            <button className="gpa" onClick={openCalculator} style={averageMarkStyles}>
                {averageToDisplay ? (
                    <AnimatedNum number={averageToDisplay} />
                ) : (
                    <FontAwesomeIcon icon={faCircleQuestion} className="no-gpa" />
                )}
            </button>
            <button className="gpa-target" onClick={readOnly ? null : openTargetDialog}>
                Цель: {target}
            </button>

            {calculator && (
                <SheetView
                    handleClose={closeCalculator}
                    type={{ fullHeightOnMobile: true }}
                >
                    <MarksCalculator initialMarks={marks} />
                </SheetView>
            )}
        </div>
    )
}

export default Average
