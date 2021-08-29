import React, { useRef } from 'react'

export default function SecuritySettings(props) {
    
    const oldCodeInput = useRef(null);
    const newCodeInput = useRef(null);

    function setPassword() {

        const oldCode = localStorage.lockCode;

        if (oldCode) {
            if (oldCodeInput.current.value != oldCode) {
                UI.alert("Неверный код");
                oldCodeInput.current.value = "";
                return;
            }
        }

        const newCode = newCodeInput.current.value.replace(/\D/g, '');

        if (newCode.length == 4) {
            localStorage.lockCode = newCode;
            UI.alert("Код установлен");
            props.setCurrentPanel("main");
        } else if (newCode.length == 0) {
            localStorage.lockCode = "";
            UI.alert("Код отключен");
            props.setCurrentPanel("main");
        } else {
            UI.alert("Код должен состоять из 4 цифр");
        }
    }


    return (
        <div id="security-settings">
            <input ref={oldCodeInput} type="numbers" maxLength="4" id="oldCode" placeholder="Старый код"/>
            <input ref={newCodeInput} type="numbers" maxLength="4" placeholder="Новый код (4 цифры)" id="newCode"/>
            <span className="info">Оставь пустым чтобы отключить</span>
            <button onClick={setPassword}>Установить код</button>
        </div>
    )
}
