import React, { useContext, useEffect, useState, useRef } from "react";
import { setDoc, onSnapshot } from "firebase/firestore";

import { CSSTransition } from "react-transition-group";
import { database, settingsContext } from "../../Context";

import PasswordSet from "./PasswordSet";

import './style.scss';



export default function Settings(props) {
    const [passwordSetOpen, setPasswordSetOpen] = useState(false);

    const settings = useContext(settingsContext);

    function handleChange(e) {
        const state = e.target.checked;
        const id = e.target.id;

        props.changeSetting(id, state);
    }

    function setTheme(e) {
        const theme = e.target.id;
        props.changeSetting("theme", theme);
    }
    


    return (
        <>
        <div className="windowReact" id="settings" max="false" side="right">
            <button className="close" onClick={() => props.setSettingsOpen(false)}><i className="fas fa-chevron-right"></i></button>
            <h1 className="title" align="center">Настройки</h1>
            <div className="content">
                
                <div className="category">Тема</div>

                <div className="theme block">
                    <span className="circle" id="purple" style={{ backgroundColor: "#360A6C" }} onClick={setTheme}></span>
                    <span className="circle" id="blue" style={{ backgroundColor: "#0A1B3C" }} onClick={setTheme}></span>
                    <span className="circle" id="dark" style={{ backgroundColor: "#0F0F0F" }} onClick={setTheme}></span>
                    <span className="circle" id="sepia" style={{ backgroundColor: "#F0DCBB" }} onClick={setTheme}></span>
                    <span className="circle" id="light" style={{ backgroundColor: "#F2F3F4" }} onClick={setTheme}></span>
                </div>

                <div className="category">Решебники</div>

                <div className="switch block">
                    <i className="fas fa-moon"></i>
                    <div className="label-block">
                        <a className="title">Затемнять решения</a>
                        <a className="descr">Светлый текст на темном фоне</a>
                    </div>
                    <label className="ios7-switch">
                        <input type="checkbox" id="inversion" checked={settings.inversion} onChange={handleChange}/>
                        <span></span>
                    </label>
                </div>

                <div className="switch block">
                    <i className="fas fa-eye-slash"></i>
                    <div className="label-block">
                        <a className="title">Скрыть решебники</a>
                        <a className="descr">Везде, на всех устройствах</a>
                    </div>
                    <label className="ios7-switch">
                        <input type="checkbox" id="stealth" checked={settings.stealth} onChange={handleChange}/>
                        <span></span>
                    </label>
                </div>

                <div className="switch block">
                    <i className="fas fa-eye-slash"></i>
                    <div className="label-block">
                        <a className="title">Предзагружать решения</a>
                        <a className="descr">Так они будут доступны без интернета</a>
                    </div>
                    <label className="ios7-switch">
                        <input type="checkbox" id="stealth" checked={settings.stealth} onChange={handleChange}/>
                        <span></span>
                    </label>
                </div>

                <div className="category">Безопасность</div>

                <div className="switch block" onClick={() => setPasswordSetOpen(true)}>
                    <i className="fas fa-eye-slash"></i>
                    <div className="label-block">
                        <a className="title">Настроить пароль</a>
                        <a className="descr">Приложение будет заблокировано паролем</a>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                </div>

                <div className="switch block">
                    <i className="fas fa-eye-slash"></i>
                    <div className="label-block">
                        <a className="title">Автоблокировка</a>
                        <a className="descr">Блокировать приложение через 5 минут</a>
                    </div>
                    <label className="ios7-switch">
                        <input type="checkbox" id="stealth" checked={settings.stealth} onChange={handleChange}/>
                        <span></span>
                    </label>
                </div>

            </div>
        </div>


        <CSSTransition 
                in={passwordSetOpen} 
                timeout={{
                    enter: 500,
                    exit: 400
                }}
                classNames='windowBottom' 
                unmountOnExit>

                <PasswordSet setPasswordSetOpen={setPasswordSetOpen}/>
        </CSSTransition>

        </>
    );
}