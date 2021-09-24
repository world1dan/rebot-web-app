import React from 'react'

import Backdrop from '../Elements/Backdrop';
import "./style.scss";

export default function Modal({ children, onClose, buttons }) {

    const varients = {
        initial: { 
            y: 400,
            transition: {
                type: "spring"
            }
        },
        animate: { y: 0 },
        exit: { 
            y: 400,
            transition: {
                type: "spring"
            }
        }
    }
    return (
        <Backdrop onClick={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="Modal"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={varients}
            >
            
            <div className="content">
                { children }
            </div>
            { buttons && 
                <div className="buttons-container"> { buttons }</div>
            }
            </div>
        </Backdrop>
    )
}
