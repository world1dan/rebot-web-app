import React from 'react'
import { css } from '@linaria/core'

const styles = css`
    position: relative;
    padding: 8px;
    color: var(--text1);
    background-color: var(--bg2);
    border-radius: 14px;

    .table-btn {
        padding: 7px;
        position: absolute;
        right: 12px;
        top: 14px;
    }

    .content {
        > div:first-child {
            margin-top: 8px;
        }

        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    @media (max-width: 360px) {
        .content-card {
            border-radius: 0 !important;
        }
    }

    .header {
        display: flex;
        gap: 10px;
        align-items: baseline;
        margin: 6px 0 6px 5px;
        padding: 6px;

        @media (max-width: 360px) {
            gap: 6px;
        }
    }

    .title {
        font-weight: 600;
        font-size: 21px;
        text-transform: capitalize;
    }

    .sub-title {
        color: var(--text2);
        font-weight: 600;
        font-size: 15px;
    }
`

const Card = ({ children, title, subTitle }) => {
    return (
        <div className={styles}>
            {(title || subTitle) && (
                <header className="header">
                    <div className="title">{title}</div>
                    <div className="sub-title">{subTitle}</div>
                </header>
            )}
            <div className="content">{children}</div>
        </div>
    )
}

export default Card
