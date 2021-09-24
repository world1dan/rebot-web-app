import React from 'react';
import PropTypes from "prop-types";



import Backdrop from '../Elements/Backdrop';
import CenterLayout from '../Elements/CenterLayout';


import "./style.scss";


import AlertButton from './AlertButton';

const variants = {
    visible: { 
        opacity: 1,
        transition: { 
            type: "spring",
            bounce: 0.18,
            duration: 0.3
        }
    },

    closed: { 
        opacity: 0,
        transition: {
            duration: 0.18
        }
    }
}


function Alert({ children, buttons, onClose }) {
    return (
        <Backdrop active>
            <CenterLayout>
                <div
                    className="Alert"
                    variants={variants}
                    initial="closed"
                    animate="visible"
                    exit="closed"
                >

                    <div className="Alert__content">
                        { children }
                    </div>

                    <div className="Alert__buttons">
                        <AlertButton title="Закрыть" onClick={onClose}></AlertButton>
                        <AlertButton title="Удалить" destructive></AlertButton>
                    </div>

                </div>
            </CenterLayout>
        </Backdrop>
    )
}


Alert.propTypes = {

}

export default Alert;