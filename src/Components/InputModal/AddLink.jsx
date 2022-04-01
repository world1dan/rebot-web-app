import { faLink, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@linaria/core'

import PlusRounded from '../Icons/PlusRounded'

const styles = css`
    height: 40px;
    min-width: 70px;
    background-color: var(--bg4);
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 17px;
    max-width: 180px;
    gap: 10px;
`

const AddLink = ({ setLink, currentLink }) => {
    const addLink = () => {
        const link = prompt('Добавить ссылку', currentLink)

        const regex = new RegExp(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
        )

        if (link == null) return
        if (link == '' || link.match(regex)) {
            setLink(link)
        } else {
            alert('Это не ссылка')
        }
    }

    return (
        <button className={styles} onClick={addLink}>
            {currentLink ? (
                <FontAwesomeIcon icon={faPen} />
            ) : (
                <PlusRounded width={18} height={18} />
            )}

            <FontAwesomeIcon icon={faLink} color="var(--green)" />
        </button>
    )
}

export default AddLink
