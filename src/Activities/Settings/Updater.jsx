import React from "react"
import useServiceWorker from "../../Hooks/useServiceWorker"

import "./style.scss"





const Updater = () => {

    const { checking, updateFounded, checkForUpdates } = useServiceWorker()


    return (
        <div className="Updater">
            <button className={"check-btn" + (checking ? " active" : "")} onClick={checkForUpdates}>
                <svg width="30" height="30" viewBox="0 0 28 28" fill="currentColor"><path d="M13.7451 12.0986C14 12.0986 14.2021 12.0195 14.3604 11.8525L17.9639 8.22266C18.1572 8.0293 18.2451 7.81836 18.2451 7.57227C18.2451 7.33496 18.1484 7.10645 17.9639 6.93066L14.3604 3.26562C14.2021 3.08984 14 3.00195 13.7451 3.00195C13.2705 3.00195 12.8926 3.39746 12.8926 3.88086C12.8926 4.11816 12.9805 4.31152 13.1299 4.47852L15.2305 6.53516C14.8174 6.47363 14.3955 6.43848 13.9736 6.43848C9.62305 6.43848 6.14258 9.91895 6.14258 14.2783C6.14258 18.6377 9.64941 22.1445 14 22.1445C18.3594 22.1445 21.8574 18.6377 21.8574 14.2783C21.8574 13.751 21.4883 13.373 20.9609 13.373C20.4512 13.373 20.1084 13.751 20.1084 14.2783C20.1084 17.6709 17.3926 20.3955 14 20.3955C10.6162 20.3955 7.8916 17.6709 7.8916 14.2783C7.8916 10.8594 10.5898 8.15234 13.9736 8.15234C14.5449 8.15234 15.0723 8.19629 15.5381 8.27539L13.1387 10.6484C12.9805 10.8066 12.8926 11 12.8926 11.2373C12.8926 11.7207 13.2705 12.0986 13.7451 12.0986Z"/></svg>
            </button>
            <div className="descr">
                <span className="title">{ updateFounded ? "Доступно обновление" : "Обновления" }</span>
                <span className="info">{ checking ? "Проверка.." : "Последняя проверка: 18:30" }</span>
            </div>
            { updateFounded && <button className="update-btn" onClick={() => location.reload()}>Обновить</button> }
            { !updateFounded && <span className="version">V1.0.3</span> }

        </div>
    )
}



export default Updater