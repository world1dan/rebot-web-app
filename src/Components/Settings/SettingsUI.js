import React, { useState } from "react";

import SecuritySettings from "./SecuritySettings";
import ThemeChanger from "./ThemeChanger";
import Button from "../Elements/Panel/Button";
import Switch from "../Elements/Panel/Switch";

import Panel from "../Elements/Panel";
import PanelHeader from "../Elements/Panel/PanelHeader";

import './style.scss';


export default function SettingsUI(props) {

    const [currentPanel, setCurrentPanel] = useState("main"); // security

    return (
        <>
            <Panel currentPanel={currentPanel} id="main">
                <PanelHeader title="Основные"/>

                <div className="settings-block">
                    <ThemeChanger setTheme={props.setTheme}/>

                    <Switch
                        title="Затемнять решения"
                        descr="Светлый текст на темном фоне"
                        icon={<i className="fas fa-moon"></i>}
                        onChange={(e) => props.setInversion(e.target.checked)}
                        checked={props.inversion}
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
                        onClick={props.logout}
                    />
                </div>
            </Panel>
            <Panel currentPanel={currentPanel} id="security">
                <PanelHeader
                    title="Пароль"
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