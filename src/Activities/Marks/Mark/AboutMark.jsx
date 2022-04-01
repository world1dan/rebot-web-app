import { useContext } from 'react'
import { css } from '@linaria/core'

import { SubjectMarkContext } from '../QuarterMarks/SubjectMarks/SubjectMarksContext'

import ActionSheet from '../../../Components/ActionSheet'
import AboutMarkActions from './AboutMarkActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const styles = css`
    display: grid;
    grid-template-rows: 22px 1fr;
    gap: 10px;
    width: 100%;
    height: 380px;
    padding: 12px;

    .right-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .modal-title {
        padding-left: 4px;
        color: var(--text2);
        font-weight: 700;
        font-size: 13px;
    }

    .info {
        display: grid;
        grid-template-rows: 30px 70px;
        grid-template-columns: 100px 1fr;
        column-gap: 20px;
    }

    .subject {
        font-weight: 600;
        font-size: 23px;
    }

    .time {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 24px;
        color: var(--text2);
        font-weight: 600;
        font-size: 16px;
    }

    .mark-num {
        display: flex;
        grid-row-start: 1;
        grid-row-end: 3;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 36px;
        background-color: var(--bg4);
        border-radius: 9px;
        box-shadow: 0 0 0 1px var(--lvl4-borders) inset;
    }

    .btns {
        display: grid;
        grid-template-rows: 54px 54px;
        gap: 8px;
        align-self: flex-end;

        button {
            display: grid;
            grid-template-columns: 20px 1fr;
            align-items: center;
            height: 54px;
            margin: 0;
            padding: 0;
            padding: 0 18px;
            font-size: 16px;
            background-color: var(--bg4);
            border-radius: 9px;
        }

        .remove {
            color: var(--red);
        }
    }
`

const AboutMark = ({ mark, handleClose, markStyle, quarter, isYearMark }) => {
    const { subject, readOnly } = useContext(SubjectMarkContext)

    const date = new Date(mark.time).toLocaleString()

    return (
        <ActionSheet onClose={handleClose}>
            <div className={styles}>
                <div className="modal-title">ОЦЕНКА</div>
                <div className="info">
                    <div className="mark-num" style={markStyle}>
                        {mark.mark}
                    </div>
                    <div className="right-section">
                        <div className="subject">
                            {subject.full_title || subject.title}
                        </div>
                        <div className="time">
                            <FontAwesomeIcon icon={faCalendar} />
                            {!isYearMark ? date : `${quarter} Четверть`}
                        </div>
                    </div>
                </div>
                <AboutMarkActions
                    subject={subject}
                    isYearMark={isYearMark}
                    quarter={quarter}
                    mark={mark}
                    readOnly={readOnly}
                />
            </div>
        </ActionSheet>
    )
}

export default AboutMark
