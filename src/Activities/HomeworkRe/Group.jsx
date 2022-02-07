import React from 'react'
import PropTypes from 'prop-types'
import ReshebaViewer from '../../Components/ReshebaViewer'
import { css } from '@linaria/core'

const styles = css`
    display: flex;
    gap: 6px;
    margin-right: 47px;
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 99;

    .title {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        width: 100px;
    }

    .homework {
        box-shadow: 0 0 0 1.5px var(--borders-soft) inset;
        flex-grow: 1;
        font-size: 13px;
        font-weight: 600;
        overflow-x: auto;
        padding: 0 10px;
        white-space: nowrap;
    }

    .block {
        background-color: var(--bg4);
        border-radius: 6px;
        height: 38px;
        line-height: 38px;
        text-align: center;
    }
`
const Group = ({ subjectInfo, toOpen, hwRaw }) => {
    const viewers = toOpen.map((num, key) => {
        if (num) {
            return (
                <ReshebaViewer
                    key={key}
                    subjectInfo={subjectInfo}
                    startNum={num}
                />
            )
        }
    })

    const titleStyle = {
        backgroundColor: subjectInfo.color,
    }

    return (
        <>
            <div className={styles}>
                <div className="title block" style={titleStyle}>
                    {subjectInfo.title}
                </div>
                <div className="homework block">{hwRaw}</div>
            </div>

            {viewers}
        </>
    )
}

Group.propTypes = {
    subjectInfo: PropTypes.object.isRequired,
    toOpen: PropTypes.array.isRequired,
    hwRaw: PropTypes.string,
}

export default Group
