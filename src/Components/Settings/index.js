import React, { useContext, useState } from "react";

import { settingsContext } from "../../Context";

import SecuritySettings from "./SecuritySettings";
import ThemeChanger from "./ThemeChanger";
import Button from "../Elements/Panel/Button";
import Switch from "../Elements/Panel/Switch";

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

    function logout() {
        localStorage.user = null;
        window.location = "./auth.html"
    }

    return (
        <>
            <Panel currentPanel={currentPanel} id="main">
                <PanelHeader title="Основные"/>

                <div className="settings-block">
                    <ThemeChanger theme={settings.theme} changeSetting={props.changeSetting}/>

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

                    <Button
                        title="Выйти"
                        icon={<i className="fas fa-sign-out-alt"></i>}
                        onClick={logout}
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
                    <SecuritySettings setCurrentPanel={setCurrentPanel}/>
                </div>
            </Panel>
        </>
    );
}