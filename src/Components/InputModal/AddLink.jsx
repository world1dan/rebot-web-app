import React from 'react'
import { css } from '@linaria/core'

import PlusRounded from '../Icons/PlusRounded'

const styles = css`
    cursor: pointer;
    height: 40px;
    min-width: 70px;
    background-color: var(--bg4);
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 17px;
    color: var(--green);
    max-width: 180px;
    overflow: hidden;
    gap: 10px;
    svg {
        color: var(--text2);
    }

    .current-link {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 15px;
    }
`

const AddLink = ({ setLink, currentLink }) => {
    const addLink = () => {
        const link = prompt('Добавить ссылку', currentLink)
        var expression =
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
        var regex = new RegExp(expression)

        if (link == null) return
        if (link == '' || link.match(regex)) {
            setLink(link)
        } else {
            alert('Это не ссылка')
        }
    }

    return (
        <div className={styles} onClick={addLink}>
            {currentLink ? (
                <i className="fas fa-pen"></i>
            ) : (
                <PlusRounded width={18} height={18} />
            )}

            {currentLink && <div className="current-link">{currentLink}</div>}
            <i className="fas fa-paperclip"></i>
        </div>
    )
}

export default AddLink
