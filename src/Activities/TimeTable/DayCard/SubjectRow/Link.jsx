import React from 'react'
import { css } from '@linaria/core'

import ContextMenu from '../../../../Components/ContextMenu'
import ContextMenuBtn from '../../../../Components/ContextMenu/ContextMenuBtn'

const styles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    padding-right: 4px;
    font-size: 15px;

    .context-menu-btn {
        color: var(--green);
    }
    .context-menu-variant {
        width: 200px;
    }

    .link-preview {
        width: 200px;
        height: 40px;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0 10px;
        color: var(--text2);

        &::-webkit-scrollbar {
            height: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--bg4);
            border-radius: 10px;
        }
    }
`

const Link = ({ URL }) => {
    const openLink = () => {
        window.open(URL, '_blank')
    }

    return (
        <div className={styles}>
            <ContextMenu icon={<i className="fas fa-paperclip"></i>}>
                <div className="link-preview">{URL}</div>
                <ContextMenuBtn
                    title="Перейти"
                    onClick={openLink}
                    icon={<i className="fas fa-external-link-alt"></i>}
                />
            </ContextMenu>
        </div>
    )
}

export default Link
