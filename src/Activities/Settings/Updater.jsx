import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useServiceWorker from '../../Hooks/useServiceWorker'

import './style.scss'

const Updater = () => {
    const { checking, updateFounded, checkForUpdates } = useServiceWorker(true)

    return (
        <div className="Updater">
            <button
                className={'check-btn' + (checking ? ' active' : '')}
                onClick={checkForUpdates}
            >
                <FontAwesomeIcon icon={faRotateRight} size="xl" />
            </button>
            <div className="descr">
                <span className="title">
                    {updateFounded ? 'Доступно обновление' : 'Обновлений нет'}
                </span>
                <span className="info">{checking ? 'Проверка..' : ''}</span>
            </div>
            {updateFounded && (
                <button className="update-btn" onClick={() => location.reload()}>
                    Обновить
                </button>
            )}
        </div>
    )
}

export default Updater
