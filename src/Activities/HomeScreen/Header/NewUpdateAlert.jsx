import { css } from '@linaria/core'

import ContextMenu from '../../../Components/ContextMenu'
import ContextMenuBtn from '../../../Components/ContextMenu/ContextMenuBtn'
import DownloadSquare from '../../../Components/Icons/DownloadSquare'

const updateIconStyles = css`
    &::after {
        position: absolute;
        top: -6px;
        right: -4px;
        background: var(--green);
        width: 6px;
        height: 6px;
        content: '';
        border-radius: 50%;
    }
`

const updateMenuStyles = css`
    padding: 10px;
    font-size: 15px;
`

const NewUpdateAlert = () => {
    return (
        <ContextMenu
            icon={
                <button className={updateIconStyles}>
                    <DownloadSquare width={22} height={22} />
                </button>
            }
        >
            <div className={updateMenuStyles}>Найдено обновление</div>
            <ContextMenuBtn
                title="Обновить"
                onClick={() => document.location.reload()}
            />
        </ContextMenu>
    )
}

export default NewUpdateAlert
