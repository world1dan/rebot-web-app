import React from 'react'

export default function ModalButton({ title, onClick, type }) {

    const classNames = "action-button " + ( type && type)

    return (
        <button className={classNames} onClick={onClick}>
            { title }
        </button>
    )
}
