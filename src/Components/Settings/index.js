import React, { useContext, useState } from "react";

import { settingsContext } from "../../Context";


import Button from "./Button";
import Switch from "./Switch";

import Panel from "../Elements/Panel";
import PanelHeader from "../Elements/Panel/PanelHeader";

import './style.scss';


export default function Settings(props) {
    const settings = useContext(settingsContext);
    const [currentPanel, setCurrentPanel] = useState("main"); // security

    function handleChange(id, e) {
        const state = e.target.checked;

        props.changeSetting(id, state);
    }

    function setTheme(e) {
        const theme = e.target.id;
        props.changeSetting("theme", theme);
    }
    
    function logout() {
        localStorage.user = null;
        window.location = "./auth.html"
    }

    return (
        <>
            <Panel currentPanel={currentPanel} id="main">
                <PanelHeader title="Основные"/>
                <div className="settings-block">
                    <div className="theme block">
                        <span className="circle" id="purple" style={{ backgroundColor: "#360A6C" }} onClick={setTheme}></span>
                        <span className="circle" id="blue" style={{ backgroundColor: "#0A1B3C" }} onClick={setTheme}></span>
                        <span className="circle" id="dark" style={{ backgroundColor: "#0F0F0F" }} onClick={setTheme}></span>
                        <span className="circle" id="ultraDark" style={{ backgroundColor: "#000" }} onClick={setTheme}></span>
                        <span className="circle" id="light" style={{ backgroundColor: "#F2F3F4" }} onClick={setTheme}></span>
                    </div>

                    <div className="category">Решебники</div>

                    <Switch
                        title="Затемнять решения"
                        descr="Светлый текст на темном фоне"
                        icon={<i className="fas fa-moon"></i>}
                        onChange={(e) => handleChange("inversion", e)}
                        checked={settings.inversion}
                    />

                    <Switch
                        title="Скрыть решебники"
                        descr="Везде, на всех устройствах"
                        icon={<i className="fas fa-eye-slash"></i>}
                        onChange={(e) => handleChange("stealth", e)}
                        checked={settings.stealth}
                    />

                    <Button
                        title="Настроить пароль"
                        descr="Приложение будет заблокировано паролем"
                        icon={<i className="fas fa-lock"></i>}
                        onClick={() => setCurrentPanel("security")}
                    />
                </div>
            </Panel>
            <Panel currentPanel={currentPanel} id="security">
                <PanelHeader
                    title="Безопасность"
                    onBack={() => setCurrentPanel("main")}
                    backButton
                />

                <div className="settings-block">
                    <Button
                        title="Выйти"
                        icon={<i className="fas fa-sign-out-alt"></i>}
                        onClick={logout}
                    />
                </div>
            </Panel>
        </>
    );
}