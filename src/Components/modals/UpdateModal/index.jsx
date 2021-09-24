import React from 'react'

import { Icon56DownloadOutline } from '@vkontakte/icons';

import Modal from "../../Modal";
import ModalButton from '../../Modal/ModalButton';

import "./style.scss"

export default function UpdateModal({ onClose }) {
    return (
        <Modal 
            onClose={onClose}
            buttons={
                <>
                <ModalButton title="Позже" onClick={onClose}/>
                <ModalButton title="Обновить" onClick={() => location.reload()} type="primary"/>
                </>
            }>
            <Icon56DownloadOutline width={96} height={96}/>
            <span className="update-modal-title">Доступно обновление</span>
            <span className="update-modal-info">Для установки нужно перезагрузить приложение</span>
        </Modal>
    )
}
