import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AttachButton from './AttachButton'

const AddLink = ({ setLink, currentLink }) => {
    const addLink = () => {
        const link = prompt(
            currentLink ? 'Изменить ссылку' : 'Добавить ссылку',
            currentLink
        )

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
        <AttachButton
            icon={<FontAwesomeIcon icon={faLink} color="var(--green)" />}
            onClick={addLink}
            isAlreadyAttached={currentLink == true}
        />
    )
}

export default AddLink
