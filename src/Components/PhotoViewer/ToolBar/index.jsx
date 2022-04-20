import { css } from '@linaria/core'

import { faArrowUpFromBracket, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ToolButton from './ToolButton'

const styles = css`
    background: var(--bg2-translucent);

    backdrop-filter: var(--ultra-thin-material);
    -webkit-backdrop-filter: var(--ultra-thin-material);

    border-top: 1px var(--borders) solid;
    box-sizing: border-box;

    padding-right: max(12px, env(safe-area-inset-right));
    padding-bottom: max(12px, env(safe-area-inset-bottom));
    padding-left: max(12px, env(safe-area-inset-left));
    padding-top: 12px;

    width: 100%;
    z-index: 1;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));

    gap: 10px;
    position: absolute;

    @media (min-width: 600px) {
        max-width: 600px;
        border: 1px var(--borders) solid;
        border-bottom: 0;
        border-radius: 14px 14px 0 0;
    }
`

const ToolBar = ({ PhotoURL, handleRemove }) => {
    const sharePhoto = () => {
        try {
            navigator.share({
                title: 'Фото',
                url: PhotoURL,
            })
        } catch {
            alert('Ошибка')
        }
    }

    return (
        <div className={styles}>
            <ToolButton
                onClick={sharePhoto}
                text="Поделиться"
                icon={
                    <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        color="var(--blue)"
                        size="lg"
                    />
                }
            />

            {handleRemove && (
                <ToolButton
                    onClick={() => handleRemove(PhotoURL)}
                    icon={
                        <FontAwesomeIcon icon={faTrashCan} color="var(--red)" size="lg" />
                    }
                    text="Удалить"
                />
            )}
        </div>
    )
}

export default ToolBar
