import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@linaria/core'

const styles = css`
    padding: 4px;
    box-shadow: 0 0 0 3px var(--indigo);
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(0);
    -webkit-backdrop-filter: blur(0);
    .avatar {
        display: block;
        border-radius: 50%;
    }

    .edit-avatar {
        padding-top: 4px;
        padding-bottom: 5px;
        position: absolute;
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        background: rgba(0, 0, 0, 0.432);
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 10px;
        font-weight: 500;
        color: #fff;

        letter-spacing: -0.3px;
    }
`

const Avatar = ({ avatarURL }) => {
    return (
        <div className={styles}>
            <img src={avatarURL} width="100%" className="avatar"></img>

            <button className="edit-avatar">
                <FontAwesomeIcon icon={faPenToSquare} size="lg" />
            </button>
        </div>
    )
}

export default Avatar
